from time import sleep
from datetime import datetime

from django.utils import timezone
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods, require_GET
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from api.models import Stock, StockDailyData, StockSMAData, StockVWAPData, \
    StockRSIData
from TSIbackend.settings import ALPHA_VANTAGE_API_KEY, SELECTED_STOCK_TICKERS
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.techindicators import TechIndicators
from alpha_vantage.fundamentaldata import FundamentalData
from .serializers import UserSerializer, ProfileSerializer, WatchListSerializer

from .models import Profile, Stock, FavStock
import json

from django.core.exceptions import ObjectDoesNotExist


def getUserDataJson(user):
    userSerial = UserSerializer(user)

    profile = Profile.objects.get(user=user)

    retData = dict()
    retData.update(userSerial.data)
    retData.update({"investmentType":profile.investmentType})

    return retData


# Create a user
# inputs:
# - username [required]
# - password [required]
# - first_name  [required]
# - last_name [required]
# - email [optional]
# - phonenumber [optional]
# - risk_type [optional]
# outputs:
# - status message
# - user object of information
@csrf_exempt
@require_http_methods(['POST','OPTIONS']) 
def create_user(request):
    
    # grabbing relevant infromation from post
    username = request.POST.get('username')
    password = request.POST.get('password')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    phonenumber = request.POST.get('phonenumber')
    risk_type = request.POST.get('risk_type')
    
    print("user information received")

    # set empty values if fields are empty
    if not email:
        email = " "


    # checking for required fields
    missing = []

    if not first_name:
        missing.append("first_name")
    
    if not last_name:
        missing.append("last_name")

    if not username:
        missing.append("username")
    
    if not password:
        missing.append("password")

    if len(missing) > 0:
        resp = {
            "status":"missing required information",
            "missing":missing
        }

        return JsonResponse(resp,status=200)
        

    # see if user already exists 
    try:
        user = User.objects.get(username=username)

        resp = {
            "status":"User already exists"
        }

        return JsonResponse(resp,status=200)
    except ObjectDoesNotExist:
        # create user
        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
        user.set_password(password)
        user.save()

        user.profile.phoneNumber = phonenumber
        user.profile.risk_type = risk_type

        # add TSLA to their watchlist by default
        stock = Stock.objects.get(ticker="TSLA")
        FavStock.objects.create(
        user = user,
        stock = stock
        )

        # create serialzed user information
        userSerial = UserSerializer(user)

        profile = Profile.objects.get(user=user)

        retData = dict()
        retData.update(userSerial.data)
        retData.update({"investmentType":profile.investmentType})


        resp = {
            "status":"user " + user.username + " successfully created",
            "userData": retData
        } 
        
        return JsonResponse(resp, status=200)
    except Exception:

        resp = {
            "status": "Error Occured"
        }
        print(str(Exception))

        return JsonResponse(resp,status=500)

    



# modifying a user's data
# inputs:
# - username [required]
# - first_name [optional]
# - last_name  [optional]
# - risk_type [optional]
# - email [optional]
# - Phone number [optional]
# outputs:
# - success message 
# - new user information
@csrf_exempt
@require_http_methods(['POST','OPTIONS']) 
def change_user_info(request):

    # get username from post request
    username = request.POST.get('username')

    # response dictionary
    resp = dict()

    resp.update({"status":""})

    # grab the relevant information from the database
    try:
        user = User.objects.get(username=username)
        resp['status'] = "user updated successfully"
    except ObjectDoesNotExist:
        resp["status"] = "User does not exist"
        return JsonResponse(resp,status=200)
    except Exception:

        resp = {
            "status": "Error Occured"
        }
        print(str(Exception))

        return JsonResponse(resp,status_code=500)
    
    userchanges = dict()
    
    # modify first_name
    first_name = request.POST.get('first_name')
    if first_name:
        
        user.first_name = first_name

        userchanges.update({
            "first_name":first_name
        })
    
    # modify last_name
    last_name = request.POST.get('last_name')
    if last_name:
        
        user.last_name = last_name 

        userchanges.update({
            "last_name":last_name
        })

    # modify phonenumber
    phonenumber = request.POST.get('phonenumber')
    if phonenumber:
        
        user.profile.phoneNumber = phonenumber 

        userchanges.update({
            "phonenumber":phonenumber
        })

    # modify email
    email = request.POST.get('email')
    if email:
        
        user.email = email 

        userchanges.update({
            "email":email
        })

     # modify risk type
    investment_type = request.POST.get('investment_type')
    if investment_type:
        
        user.profile.investmentType = investment_type

        userchanges.update({
            "investment_type":investment_type
        })
    

    resp.update({
        "changes":userchanges
    })

    user.save()

    return JsonResponse(resp,status=200)
    

# removing a stock from the user's watchlist
# inputs:
# - username
# - ticker
# output:
# - status message
@csrf_exempt
@require_http_methods(['POST','OPTIONS']) 
def remove_from_watchlist(request):
    # grab info from request
    username = request.POST.get("username")
    ticker = request.POST.get("ticker")

    # grab the relevant information from the database
    try:
        user = User.objects.get(username=username)
    except:
        res = {
        "status":"User does not exist"
        }

        return JsonResponse(res)
    
    try:
        stock = Stock.objects.get(ticker=ticker)
    except:
        res = {
        "status":"Invalid ticker"
        }

        return JsonResponse(res)


    favStock = FavStock.objects.filter(user=user,stock=stock)

    if favStock:
        favStock.delete()

        userJson = getUserDataJson(user)

        res = {
            "status": ticker + " was removed from " + username +"'s watchlist",
            "userData": userJson
        }

        return JsonResponse(res,status=200)
    else:
        res = {
            "status": ticker + " is not on " + username +"'s watchlist"
        }

        return JsonResponse(res)
    
    

    



# adding a stock to the user's watchlist
# inputs:
# - username 
# - ticker
# outputs:
# - success message
@csrf_exempt
@require_http_methods(['POST','OPTIONS']) 
def add_to_watchlist(request):

    # grab info from request
    username = request.POST.get("username")
    ticker = request.POST.get("ticker")

    # grab the relevant information from the database
    try:
        user = User.objects.get(username=username)
    except ObjectDoesNotExist:
        res = {
        "status":"User does not exist"
        }

        return JsonResponse(res,status=200)
    except Exception:

        resp = {
            "status": "Error Occured"
        }
        print(str(Exception))

        return JsonResponse(resp,status_code=500)

    
    try:
        stock = Stock.objects.get(ticker=ticker)
    except ObjectDoesNotExist:
        res = {
        "status":"Invalid ticker"
        }

        return JsonResponse(res,status=200)
    except Exception:

        resp = {
            "status": "Error Occured"
        }
        print(str(Exception))

        return JsonResponse(resp,status=500)

        
    favStock = FavStock.objects.filter(user=user,stock=stock)

    if len(favStock) == 0:

        # add stock to watchlist
        FavStock.objects.create(
        user = user,
        stock = stock
        )

        # construct array of current watch list
        retStocks = []
        favstock_set = FavStock.objects.filter(user=user)
        for item in favstock_set:
            retStocks.append(str(item.stock))

        # grab the user's data
        userJson = getUserDataJson(user)

        # create return object
        res = {
        "status":"success",
        "userData": userJson

        }
        return JsonResponse(res,status=200)
    else:

        res = {
        "status":"User already has this on their watchlist"
        }

        return JsonResponse(res,status=200)

        



# Logging in the user
# POST request inputs:
# - username
# - password
# return:
# - username
# - first_name
# - last_name
# - watchlist
# - risk type

@csrf_exempt
@require_http_methods(['POST','OPTIONS']) 
def login_user(request):

    # get the username of the user
    username = request.POST.get("username")
    password = request.POST.get("password")

    print(request.POST)

    # try to get the user
    try:
        user = User.objects.get(username=username)
    except: 

        resp = {
            "status":"User does not exist"
        }
        return JsonResponse(resp,status=200)

    print("got the correct user")
    # see if the password is correct
    if user.check_password(password):

        print("password checks out")
        # serialize user profile
        userSerial = UserSerializer(user)

        profile = Profile.objects.get(user=user)

        retData = dict()
        retData.update(userSerial.data)
        retData.update({"investmentType":profile.investmentType})

        # grab user information and send over
        return JsonResponse(retData)
    else: 

        resp ={
            "status":"password is not valid"
        }
        return JsonResponse(resp,status=200)


def update_stock_overview(ticker):
    fd = FundamentalData(key=ALPHA_VANTAGE_API_KEY,
            output_format='json', indexing_type='date')

    print("Getting company overview")
    company_data, metadata = fd.get_company_overview(ticker)

    print("Updating company overview")
    try:
        stock = Stock.objects.get(ticker=ticker)
        print("Stock already in database. Not adding.")
    except ObjectDoesNotExist:
        print("Adding stock to database")
        stock = Stock()
        stock.ticker = ticker

    stock.description = company_data['Description'][:3000]
    stock.fullName = company_data['Name'][:50]
    stock.save()

    return stock

def update_stock_daily_data(stock):
    ts = TimeSeries(key=ALPHA_VANTAGE_API_KEY,
            output_format='json', indexing_type='date')

    print("Getting ticker daily adjusted")
    daily_data, metadata = ts.get_daily_adjusted(
            symbol=stock.ticker, outputsize='compact')

    try:
        latest_data = StockDailyData.objects.filter(stock=stock).latest('timestamp')
        print("Existing daily adjusted data found in database")
        latest_timestamp = latest_data.timestamp
    except ObjectDoesNotExist:
        latest_timestamp = None
        print("No daily adjusted data found in database")

    print(f"Updating stock daily data ({len(daily_data)} entries to process)")
    daily_data_set = []
    for day in daily_data:
        # Don't add existing data
        timestamp = timezone.make_aware(datetime.strptime(day, '%Y-%m-%d'), timezone.get_default_timezone())
        if latest_timestamp != None and timestamp < latest_timestamp:
            continue

        db_daily_data = StockDailyData()
        db_daily_data.stock = stock
        db_daily_data.timestamp = timestamp
        db_daily_data.interval = 'daily'
        db_daily_data.open = daily_data[day]['1. open']
        db_daily_data.high = daily_data[day]['2. high']
        db_daily_data.low = daily_data[day]['3. low']
        db_daily_data.close = daily_data[day]['4. close']
        db_daily_data.save()

        daily_data_set.append(db_daily_data)

    return daily_data_set


def update_sma_data(stock):
    ti = TechIndicators(key=ALPHA_VANTAGE_API_KEY,
            output_format='json', indexing_type='date')

    print("Getting SMA data")
    sma_data, metadata = ti.get_sma(symbol=stock.ticker, interval='daily',
            series_type='compact')

    try:
        latest_data = StockSMAData.objects.filter(stock=stock).latest('timestamp')
        print("Existing SMA data found in database")
        latest_timestamp = latest_data.timestamp
    except ObjectDoesNotExist:
        latest_timestamp = None
        print("No SMA data found in database")

    print(f"Updating stock SMA data ({len(sma_data)} entries to process)")
    sma_data_set = []
    for time in sma_data:
        timestamp = timezone.make_aware(datetime.strptime(time, '%Y-%m-%d'), timezone.get_default_timezone())
        # Don't add existing data
        if latest_timestamp != None and timestamp < latest_timestamp:
            continue

        db_sma_data = StockSMAData()
        db_sma_data.stock = stock
        db_sma_data.timestamp = timestamp
        db_sma_data.SMA = sma_data[time]['SMA']
        db_sma_data.save()

        sma_data_set.append(db_sma_data)

    return sma_data_set


def update_vwap_data(stock):
    ti = TechIndicators(key=ALPHA_VANTAGE_API_KEY,
            output_format='json', indexing_type='date')

    print("Getting VWAP data")
    vwap_data, metadata = ti.get_vwap(symbol=stock.ticker, interval='5min')

    try:
        latest_data = StockVWAPData.objects.filter(stock=stock).latest('timestamp')
        print("Existing VWAP data found in database")
        latest_timestamp = latest_data.timestamp
    except ObjectDoesNotExist:
        latest_timestamp = None
        print("No VWAP data found in database")

    print(f"Updating stock VWAP data ({len(vwap_data)} entries to process)")
    vwap_data_set = []
    for time in vwap_data:
        timestamp = timezone.make_aware(datetime.strptime(time, '%Y-%m-%d %H:%M'), timezone.get_default_timezone())
        # Don't add existing data
        if latest_timestamp != None and timestamp < latest_timestamp:
            continue

        db_vwap_data = StockVWAPData()
        db_vwap_data.stock = stock
        db_vwap_data.timestamp = timestamp
        db_vwap_data.VWAP = vwap_data[time]['VWAP']
        db_vwap_data.save()

        vwap_data_set.append(db_vwap_data)

    return vwap_data_set


def update_rsi_data(stock):
    ti = TechIndicators(key=ALPHA_VANTAGE_API_KEY,
            output_format='json', indexing_type='date')

    print("Getting RSI data")
    rsi_data, metadata = ti.get_rsi(symbol=stock.ticker, interval='daily',
            series_type='close')

    try:
        latest_data = StockRSIData.objects.filter(stock=stock).latest('timestamp')
        print("Existing RSI data found in database")
        latest_timestamp = latest_data.timestamp
    except ObjectDoesNotExist:
        latest_timestamp = None
        print("No RSI data found in database")

    print(f"Updating stock RSI data ({len(rsi_data)} entries to process)")
    rsi_data_set = []
    for time in rsi_data:
        timestamp = timezone.make_aware(datetime.strptime(time, '%Y-%m-%d'), timezone.get_default_timezone())
        # Don't add existing data
        if latest_timestamp != None and timestamp < latest_timestamp:
            continue

        db_rsi_data = StockRSIData()
        db_rsi_data.stock = stock
        db_rsi_data.timestamp = timestamp
        db_rsi_data.RSI = rsi_data[time]['RSI']
        db_rsi_data.save()

        rsi_data_set.append(db_rsi_data)

    return rsi_data_set


def update_stock_data(request):
    # Iterate through every stock in settings.py
    for ticker in SELECTED_STOCK_TICKERS:
        # Avoid API limit (5/min)
        print("Waiting 60 seconds to avoid reaching API limit")
        sleep(60)

        print(f"--------Updating stock {ticker}--------")
        stock = update_stock_overview(ticker)
        update_stock_daily_data(stock)
        update_sma_data(stock)
        update_vwap_data(stock)
        update_rsi_data(stock)
        print("")

    return JsonResponse({"status":"Done updating stock data"})



"""
    Decorator for getting stock data. All currently-supported stock data follows
    similar format.
    Endpoint URI must end with /<ticker>.
    Parameters:
      * stock_data_model: Stock data model
      * data_type_name: Name of stock data type
      * values: List of values to retrieve from model and return in response
    Query Params:
      * start_time: oldest timestamp of data to retrieve
      * end_time: newest timestamp of data to retrieve
    Response (JSON):
    {
      "<data_type_name>": [
        {
          "timestamp": timestamp of data point,
          *values: *value data
        }
      ]
    }
"""
def stock_data_get(stock_data_model, data_type_name, values):
    def decorator(func):
        @require_GET
        def inner(request, ticker):
            # Get start_time and end_time query paramaters
            start_time = request.GET.get('start_time')
            end_time = request.GET.get('end_time')

            # Ensure start_time and end_time were specified
            if start_time == None:
                resp = {'status': 'Please specify start_time'}
                return JsonResponse(resp, status=400)
            elif end_time == None:
                resp = {'status': 'Please specify end_time'}
                return JsonResponse(resp, status=400)

            # Find stock with given ticker
            try:
                stock = Stock.objects.get(ticker=ticker)
            except ObjectDoesNotExist:
                resp = {'status': f"Stock with ticker {ticker} does not exist"}
                return JsonResponse(resp, status=400)
            except Exception:
                resp = {"status": "Error Occured"}
                print(str(exception))

                return JsonResponse(resp, status_code=500)

            # Get QuerySet of data between start_time and end_time
            data_filter = stock_data_model.objects.filter(stock=stock,
                    timestamp__gte=start_time, timestamp__lte=end_time)
            # Get values from QuerySet
            data = data_filter.values('timestamp', *values)
            # Create JSON response of values
            resp = {data_type_name: list(data)}

            return JsonResponse(resp)
        return inner
    return decorator


"""
    Get daily adjusted data for a particular stock
    Endpoint: /stocks/daily_adjusted/<str:ticker>
    Query Params:
      * start_time: oldest timestamp of data to retrieve
      * end_time: newest timestamp of data to retrieve
    Response (JSON):
    {
      "daily_adjusted": [
        {
          "timestamp": timestamp of data point,
          "interval": interval of data points,
          "open": value of stock at open,
          "high": highest value of stock,
          "low": lowest value of stock,
          "close": value of stock at close
        }
      ]
    }
"""
@stock_data_get(StockDailyData, 'daily_adjusted', ['interval', 'open', 'high',
    'low', 'close'])
def get_daily_adjusted(request, ticker):
    pass

"""
    Get SMA data for a particular stock
    Endpoint: /stocks/SMA/<str:ticker>
    Query Params:
      * start_time: oldest timestamp of data to retrieve
      * end_time: newest timestamp of data to retrieve
    Response (JSON):
    {
      "SMA": [
        {
          "timestamp": timestamp of data point,
          "SMA": SMA at timestamp
        }
      ]
    }
"""
@stock_data_get(StockSMAData, 'SMA', ['SMA'])
def get_sma(request, ticker):
    pass


"""
    Get VWAP data for a particular stock
    Endpoint: /stocks/VWAP/<str:ticker>
    Query Params:
      * start_time: oldest timestamp of data to retrieve
      * end_time: newest timestamp of data to retrieve
    Response (JSON):
    {
      "VWAP": [
        {
          "timestamp": timestamp of data point,
          "VWAP": VWAP at timestamp
        }
      ]
    }
"""
@stock_data_get(StockVWAPData, 'VWAP', ['VWAP'])
def get_vwap(request, ticker):
    pass


"""
    Get RSI data for a particular stock
    Endpoint: /stocks/RSI/<str:ticker>
    Query Params:
      * start_time: oldest timestamp of data to retrieve
      * end_time: newest timestamp of data to retrieve
    Response (JSON):
    {
      "RSI": [
        {
          "timestamp": timestamp of data point,
          "RSI": RSI at timestamp
        }
      ]
    }
"""
@stock_data_get(StockRSIData, 'RSI', ['RSI'])
def get_rsi(request, ticker):
    pass

