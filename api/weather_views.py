import datetime
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from api import location
from api.tools import *

DATA = dict()


def sublist(ls1, ls2):
    def get_all_in(one, another):
        for element in one:
            if element in another:
                yield element

    for x1, x2 in zip(get_all_in(ls1, ls2), get_all_in(ls2, ls1)):
        if x1 != x2:
            return False

    return True


def get_feature(feature, data):
    if feature == 'alerts' and 'alerts' in data:
        return data['alerts']
    elif feature == 'astronomy' and 'moon_phase' in data:
        return data['moon_phase']
    elif feature == 'conditions' and 'current_observation' in data:
        return data['current_observation']
    elif (feature == 'forecast'
          or feature == 'forecast10day') and 'forecast' in data:
        return data['forecast']
    elif (feature == 'hourly'
          or feature == 'hourly10day') and 'hourly_forecast' in data:
        return data['hourly_forecast']
    elif feature == 'rawtide' and 'rawtide' in data:
        return data['rawtide']
    elif feature == 'tide' and 'tide' in data:
        return data['tide']
    else:
        return {
            "error": "feature '{}' not found in response data".format(feature)
        }


def load_weather_data(features, loc, key):
    global DATA
    valid_features = [
        'alerts', 'almanac', 'astronomy', 'conditions', 'currenthurricane',
        'forecast', 'forecast10day', 'geolookup', 'history', 'hourly',
        'hourly10day', 'planner', 'rawtide', 'tide', 'webcams', 'yesterday'
    ]
    for _ in features:
        if _ not in valid_features:
            return {"error": "invalid feature '{}'".format(_)}
    if len(features) == 0:
        return {"error": "must provide atleast one feature"}
    if location.fmt(loc) in DATA and (datetime.datetime.now(
    ) - DATA[location.fmt(loc)][0]).seconds <= 300 and set(features).issubset(
            set(DATA[location.fmt(loc)][1])):
        response = DATA[location.fmt(loc)][2]
    else:
        response = get(
            'https://api.wunderground.com/api/{}/{}/q/{},{}.json'.format(
                key, '/'.join(features), location.lat(loc), location.lng(loc)))
        DATA[location.fmt(loc)] = (datetime.datetime.now(), features, response)
    data = dict()
    for _ in features:
        data[_] = get_feature(_, response)
    return data


def format_request(req_string):
    req_list = req_string.split(',')
    request_list = list()
    for st in req_list:
        base_path = str()
        key_string = str()
        if ':' in st:
            st = st.split(':')
            base_path = st[0]
            key_string = st[1]
        else:
            base_path = st
        key_list = key_string.split('-')
        if key_list and key_list[0] == str():
            key_list = list()
        request_list.append(((base_path.split('.')[-1], base_path), key_list))
    return request_list


def execute_request(features, req_data, local, request, key=None):
    response = load_weather_data(features, local,
                                 key)
    if 'error' in response:
        return response
    data = dict()
    for _ in req_data:
        if _[1]:
            data[_[0][0]] = generate_data_set(_[0][1], _[1], response)
        else:
            data[_[0][0]] = find(_[0][1], response)
    return data


@csrf_exempt
def weather(request):
    features = request.GET.get(
        'feature', 'conditions,forecast10day,hourly10day,astronomy').split(',')
    req_data = format_request(
        request.GET.get('data',
                        'conditions,forecast10day,hourly10day,astronomy'))
    google = request.GET.get('google', '')
    key = request.GET.get('key', '')
    local = location.location("", google)
    return JsonResponse(execute_request(features, req_data, local, request, key))


@csrf_exempt
@login_required
def weather_hourly(request):
    print(request)
    features = ['hourly10day']
    req_data = [(('hourly', 'hourly10day'),
                 [('time', 'FCTTIME.civil'), ('day', 'FCTTIME.weekday_name'),
                  ('month', 'FCTTIME.month_name'),
                  ('fahrenheit', 'temp.english'), ('celsius', 'temp.metric'),
                  ('sky', 'sky'), ('humidity', 'humidity'), ('percip',
                                                             'pop')])]
    # google = request.GET.get('google', '')
    # key = request.GET.get('key', '')
    google = request.user.profile.google
    key =    request.user.profile.wunderground
    local = location.location(request.user.profile.location, google)
    return JsonResponse(execute_request(features, req_data, local, request, key))
    # local = location.location(request.user.profile.location,
    #                           request.user.profile.google)
    # return JsonResponse(execute_request(features, req_data, local, request))


@login_required
@csrf_exempt
def weather_conditions(request):
    features = ['conditions']
    req_data = [(('conditions', 'conditions'),
                 [('location',
                   'display_location.full'), ('fahrenheit',
                                              'temp_f'), ('celsius', 'temp_c'),
                  ('wind_dir', 'wind_degrees'), ('wind_mph', 'wind_mph'),
                  ('wind_kph', 'wind_kph'), ('visibility_mi', 'visibility_mi'),
                  ('visibility_km', 'visibility_km'), ('uv', 'UV'), ('icon',
                                                                     'icon')])]
    google = request.GET.get('google', '')
    key = request.user.profile.wundergound
    local = location.location(request.user.profile.location, google)
    return JsonResponse(execute_request(features, req_data, local, request, key))
    # local = location.location(request.user.profile.location,
    #                           request.user.profile.google)
    # return JsonResponse(execute_request(features, req_data, local, request))


@csrf_exempt
def weather_astonomy(request):
    features = ['astronomy']
    req_data = [(('astronomy', 'astronomy'), [])]
    google = request.GET.get('google', '')
    key = request.GET.get('key', '')
    local = location.location("", google)
    return JsonResponse(execute_request(features, req_data, local, request, key))
    # local = location.location(request.user.profile.location,
    #                           request.user.profile.google)
    # return JsonResponse(execute_request(features, req_data, local, request))
