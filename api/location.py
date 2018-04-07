from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
import urllib.request
import json

from api.tools import *

LOCATION = dict()

def lat_lng_lookup(lat, lng, key):
    global LOCATION
    ref_string = "{},{}".format(lat, lng)
    if ref_string in LOCATION:
        return LOCATION[ref_string]
    ret = get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng={},{}&key={}'.
        format(lat, lng, key))
    if 'results' in ret and len(ret['results']) != 0:
        LOCATION[ref_string] = ret['results'][0]
        return ret['results'][0]
    else:
        LOCATION[ref_string] = ret
        return ret


def address_lookup(address, key):
    global LOCATION
    if address in LOCATION:
        return LOCATION[address]
    req_address = '+'.join(address.split())
    ret = get(
        'https://maps.googleapis.com/maps/api/geocode/json?address=+{}&key={}'.
        format(req_address, key))
    if 'results' in ret and len(ret['results']) != 0:
        LOCATION[address] = ret['results'][0]
        return ret['results'][0]
    else:
        LOCATION[address] = ret
        return ret


def ip_lookup(key):
    global LOCATION
    if "ip" in LOCATION:
        return LOCATION["ip"]
    ret = post(
        "https://www.googleapis.com/geolocation/v1/geolocate?key={}".format(
            key))
    LOCATION["ip"] = lat_lng_lookup(ret['location']['lat'],
                                    ret['location']['lng'], key)
    return LOCATION["ip"]


def lat(location):
    return location['geometry']['location']['lat']


def lng(location):
    return location['geometry']['location']['lng']


def fmt(location):
    return location['formatted_address']


@login_required
def location(request, key=None):
    if isinstance(request, str):
        if request == str():
            return ip_lookup(key)
        return address_lookup(request, key)
    elif isinstance(request, dict):
        if 'key' in request:
            key = request[key]
        if 'address' in request:
            return address_lookup(request['address'], key)
        elif 'latlng' in request:
            return lat_lng_lookup(request['latlng'].split(',')[0],
                                  request['latlng'].split(',')[1], key)
    else:
        address = request.GET.get('address', '')
        latlng = request.GET.get('latlng', '')
        if address != str():
            return JsonResponse(
                address_lookup(address, request.user.profile.google))
        elif latlng != str():
            return JsonResponse(
                lat_lng_lookup(
                    latlng.split(',')[0],
                    latlng.split(',')[1], request.user.profile.google))
    return JsonResponse(ip_lookup(request.user.profile.google))


def location_list(request):
    global LOCATION
    data = {
        "locations": [{
            "reference": key,
            "address": value['formatted_address'],
            "lat": value['geometry']['location']['lat'],
            "lng": value['geometry']['location']['lng']
        } for key, value in LOCATION.items()]
    }
    return JsonResponse(data)
