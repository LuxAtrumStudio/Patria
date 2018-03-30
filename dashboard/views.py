import urllib.request
import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import datetime

from dashboard.location import *

API_DATA = dict()

def wunderground(request):
    global API_DATA
    req = dict()
    req['data'] = request.GET.get('data', 'temperature')
    req['address'] = request.GET.get('address', '')
    req['latlng'] = request.GET.get('latlng', '')
    loc = location(req)

    if 'wunderground_' + loc['formatted_address'] in API_DATA:
        data = API_DATA
    else:
        data = {
            'time': repr(datetime.datetime.now()),
            'req': req,
            'data': req['data'].split(','),
            'location': loc,
        }
        API_DATA['wunderground' + loc['formatted_address']] = data
    return JsonResponse(data)


def home(request):
    return HttpResponse('Hello')


# Create your views here.
