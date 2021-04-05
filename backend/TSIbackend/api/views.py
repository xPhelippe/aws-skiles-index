from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

@csrf_exempt
@require_http_methods(['POST']) 
def login_user(request):

    # get the username of the user
    username = request.POST.get("username")
    password = request.POST.get("password")

    # try to get the user
    try:
        user = User.objects.get(username=username)
    except: 
        return HttpResponse("<p> user DNE <p>")

    # see if the password is correct
    if user.check_password(password):
        
        # grab user information and send over
        return HttpResponse("<p> successful Login"
    else:
        return HttpResponse("<p>bad password<p>")

    
