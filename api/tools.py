import urllib.request
import json


def get(url):
    resp = urllib.request.urlopen(url).read()
    return json.loads(resp)


def post(url, data=dict()):
    data = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(url, data)
    resp = urllib.request.urlopen(req).read()
    return json.loads(resp)


def find(term, obj):
    curr = '.'.join(term.split('.')[:1])
    cont = '.'.join(term.split('.')[1:])
    ret = None
    if cont is not str():
        if isinstance(obj, list):
            if curr.isdigit() and int(curr) < len(obj):
                return find(cont, obj[int(curr)])
            for _ in obj:
                ret = find(term, _)
                if ret != None:
                    return ret
        elif isinstance(obj, dict):
            if curr in obj:
                return find(cont, obj[curr])
        return None
    else:
        if isinstance(obj, list):
            if curr.isdigit() and int(curr) < len(obj):
                return obj[int(curr)]
            for _ in obj:
                ret = find(term, _)
                if ret != None:
                    return ret
        elif isinstance(obj, dict):
            if curr in obj:
                return obj[curr]
    return None

def generate_data_set(set_term, data_terms, obj):
    base = find(set_term, obj)
    data = list()
    if base is None or not isinstance(base, list):
        return []
    for _ in base:
        entry = dict()
        for dt in data_terms:
            if isinstance(dt, str):
                entry[dt.split('.')[-1]] = find(dt, _)
            elif isinstance(dt, tuple):
                entry[dt[0]] = find(dt[1], _)
        data.append(entry)
    return data
