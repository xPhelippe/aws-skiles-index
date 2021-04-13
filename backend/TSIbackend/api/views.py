from time import sleep

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from api.models import Stock, StockDailyData, StockSMAData, StockVWAPData, StockRSIData
from TSIbackend.settings import ALPHA_VANTAGE_API_KEY, SELECTED_STOCK_TICKERS
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.techindicators import TechIndicators
from alpha_vantage.fundamentaldata import FundamentalData
from .serializers import UserSerializer, ProfileSerializer, WatchListSerializer

from .models import Profile, Stock, FavStock
import json

from django.core.exceptions import ObjectDoesNotExist


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
    risk_type = request.POST.get('risk_type')
    if risk_type:
        
        user.profile.investmentType = risk_type

        userchanges.update({
            "risk_type":risk_type
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

        res = {
            "status": ticker + " was removed from " + username +"'s watchlist"
        }

        return JsonResponse(res)
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

        # create return object
        res = {
        "status":"success",
        "watchlist": retStocks

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


def update_stock_data(request):
    # Default options to use
    DEFAULT_SERIES_TYPE = 'close'
    DEFAULT_INTERVAL = 'daily'
    DEFAULT_OUTPUT_SIZE = 'compact'

    # Initialize alpha vantage API objects
    ts = TimeSeries(key=ALPHA_VANTAGE_API_KEY,
                    output_format='json', indexing_type='date')
    fd = FundamentalData(key=ALPHA_VANTAGE_API_KEY,
                         output_format='json', indexing_type='date')
    ti = TechIndicators(key=ALPHA_VANTAGE_API_KEY,
                        output_format='json', indexing_type='date')

    # Iterate through every stock in settings.py
    for ticker in SELECTED_STOCK_TICKERS:
        # Avoid API limit (5/min)
        print("Waiting 60 seconds to avoid reaching API limit")
        sleep(60)

        print(f"Updating ticker {ticker}")
        print(
            f"  Getting ticker daily adjusted with output size {DEFAULT_OUTPUT_SIZE}")
        daily_data, metadata = ts.get_daily_adjusted(
            symbol=ticker, outputsize=DEFAULT_OUTPUT_SIZE)

        print("  Getting company overview")
        company_data, metadata = fd.get_company_overview(ticker)

        print(
            f"  Getting SMA with interval {DEFAULT_INTERVAL} and series type {DEFAULT_SERIES_TYPE}")
        sma_data, metadata = ti.get_sma(symbol=ticker, interval=DEFAULT_INTERVAL,
                                        series_type=DEFAULT_SERIES_TYPE)

        print("  Getting VWAP with interval 5min")
        vwap_data, metadata = ti.get_vwap(symbol=ticker, interval='5min')

        print(
            f"  Getting RSI with interval {DEFAULT_INTERVAL} and series type {DEFAULT_SERIES_TYPE}")
        rsi_data, metadata = ti.get_rsi(symbol=ticker, interval=DEFAULT_INTERVAL,
                                        series_type=DEFAULT_SERIES_TYPE)

        print("  Updating stock details")
        stock = Stock()
        stock.ticker = ticker
        stock.description = company_data['Description'][:3000]
        stock.fullName = company_data['Name'][:50]
        stock.save()

        print("  Updating stock data")

        print("    Updating stock daily data")
        for day in daily_data:
            db_daily_data = StockDailyData()
            db_daily_data.stock = stock
            db_daily_data.timestamp = day
            db_daily_data.interval = DEFAULT_INTERVAL
            db_daily_data.open = daily_data[day]['1. open']
            db_daily_data.high = daily_data[day]['2. high']
            db_daily_data.low = daily_data[day]['3. low']
            db_daily_data.close = daily_data[day]['4. close']
            db_daily_data.save()

        print("    Updating stock SMA data")
        for time in sma_data:
            db_sma_data = StockSMAData()
            db_sma_data.stock = stock
            db_sma_data.timestamp = time
            db_sma_data.SMA = sma_data[time]['SMA']
            db_sma_data.save()

        print("    Updating stock VWAP data")
        for time in vwap_data:
            db_vwap_data = StockVWAPData()
            db_vwap_data.stock = stock
            db_vwap_data.timestamp = time
            db_vwap_data.VWAP = vwap_data[time]['VWAP']
            db_vwap_data.save()

        print("    Updating stock RSI data")
        for time in rsi_data:
            db_rsi_data = StockRSIData()
            db_rsi_data.stock = stock
            db_rsi_data.timestamp = time
            db_rsi_data.RSI = rsi_data[time]['RSI']
            db_rsi_data.save()

    return JsonResponse({"result":"Done updating stock data"})

