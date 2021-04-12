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

from .serializers import UserSerializer, ProfileSerializer

from .models import Profile
import json


# Create your views here.


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
        return HttpResponse("<p> user DNE <p>")

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
        return HttpResponse("<p>bad password<p>")


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

