import urllib.request
import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import datetime

from dashboard.location import *
from dashboard.keys import KEYS

from dashboard import wunderground

def get(url):
    resp = urllib.request.urlopen(url).read()
    return json.loads(resp)


def weather(request):
    return JsonResponse(wunderground.wunderground(request))


def home(request):
    return HttpResponse('Hello')


# Create your views here.
