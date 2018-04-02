import urllib.request
import json
from django.http import HttpResponse, JsonResponse

from dashboard.keys import KEYS

LOCATION = dict()

def get(url):
    resp = urllib.request.urlopen(url).read()
    return json.loads(resp)


def post(url, data=dict()):
    data = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(url, data)
    resp = urllib.request.urlopen(req).read()
    return json.loads(resp)


def lat_lng_lookup(lat, lng):
    global LOCATION
    ref_string = "{},{}".format(lat, lng)
    if ref_string in LOCATION:
        return LOCATION[ref_string]
    ret = get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng={},{}&key={}'.
        format(lat, lng, KEYS['google']))
    if 'results' in ret and len(ret['results']) != 0:
        LOCATION[ref_string] = ret['results'][0]
        return ret['results'][0]
    else:
        LOCATION[ref_string] = ret
        return ret


def address_lookup(address):
    global LOCATION
    if address in LOCATION:
        return LOCATION[address]
    req_address = '+'.join(address.split())
    ret = get(
        'https://maps.googleapis.com/maps/api/geocode/json?address=+{}&key={}'.
        format(req_address, KEYS['google']))
    if 'results' in ret and len(ret['results']) != 0:
        LOCATION[address] = ret['results'][0]
        return ret['results'][0]
    else:
        LOCATION[address] = ret
        return ret


def ip_lookup():
    global LOCATION
    if "ip" in LOCATION:
        return LOCATION["ip"]
    ret = post(
        "https://www.googleapis.com/geolocation/v1/geolocate?key={}".format(KEYS['google'])
    )
    LOCATION["ip"] = lat_lng_lookup(ret['location']['lat'],
                                    ret['location']['lng'])
    return LOCATION["ip"]

def lat(location):
    return location['geometry']['location']['lat']

def lng(location):
    return location['geometry']['location']['lng']

def fmt(location):
    return location['formatted_address']


def location(request):
    if isinstance(request, str):
        return address_lookup(request)
    elif isinstance(request, dict):
        if request['address'] != str():
            return address_lookup(request['address'])
        elif request['latlng'] != str():
            return lat_lng_lookup(request['latlng'].split(',')[0],
                                  request['latlng'].split(',')[1])
        else:
            return ip_lookup()
    else:
        address = request.GET.get('address', '')
        latlng = request.GET.get('latlng', '')
        if address != str():
            return JsonResponse(address_lookup(address))
        elif latlng != str():
            return JsonResponse(
                lat_lng_lookup(latlng.split(',')[0],
                               latlng.split(',')[1]))
        else:
            return JsonResponse(ip_lookup())


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
