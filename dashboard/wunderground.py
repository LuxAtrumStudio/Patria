import urllib.request
import json
import datetime
from dashboard.location import *
from dashboard.keys import KEYS

WUNDERGROUND_DATA = dict()

def find_json(obj, search):
    curr = '.'.join(search.split('.')[:1])
    cont = '.'.join(search.split('.')[1:])
    if isinstance(obj, list):
        ret = dict()
        if curr.isdigit() and len(obj) > int(curr):
            if cont != str():
                return find_json(obj[int(curr)], cont)
            elif isinstance(obj[int(curr)], dict):
                return obj[int(curr)]
            else:
                return {"result": obj[int(curr)]}
        for entry in obj:
            ret = find_json(entry, search)
            if ret != dict():
                return ret
        return ret
    elif isinstance(obj, dict):
        for key, value in obj.items():
            ret = dict()
            if key == curr:
                if cont != str():
                    return find_json(value, cont)
                if isinstance(value, dict):
                    return value
                else:
                    return {"result": value}
            ret = find_json(value, search)
            if ret != dict():
                return ret
        return ret
    else:
        return dict()

def load_data(request):
    global WUNDERGROUND_DATA
    valid_features = [
        'alerts', 'almanac', 'astronomy', 'conditions', 'currenthurricane',
        'forecast', 'forecast10day', 'geolookup', 'history', 'hourly',
        'hourly10day', 'planner', 'rawtide', 'tide', 'webcams', 'yesterday'
    ]
    for _ in request['feature']:
        if _ not in valid_features:
            return {"error": "invalid feature '{}'".format(_)}
    if len(request['feature']) == 0:
        return {"error": "must provide one feature"}
    loc = location(request)
    if fmt(loc) in WUNDERGROUND_DATA:
        diff = datetime.datetime.now() - WUNDERGROUND_DATA[fmt(loc)][1]
        diff = divmod(diff.days * 86400 + diff.seconds, 60)
        if diff[0] <= 120:
            pass
            # return WUNDERGROUND_DATA[fmt(loc)][0]
    response = get(
        'https://api.wunderground.com/api/{}/{}/q/{},{}.json'.format(
            KEYS['wunderground'], '/'.join(request['feature']), lat(loc),
            lng(loc)))
    WUNDERGROUND_DATA[fmt(loc)] = (response, datetime.datetime.now())
    return response

def format_data(request, response):
    return find_json(response, "txt_forecast.forecastday.4")

def wunderground(request):
    req = dict()
    req['data'] = request.GET.get('data', '')
    req['feature'] = request.GET.get('feature', 'conditions,forecast10day,hourly10day,astronomy').split(',')
    req['address'] = request.GET.get('address', '')
    req['latlng'] = request.GET.get('latlng', '')
    response = load_data(req)
    return format_data(req, response)
