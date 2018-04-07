from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.template.response import TemplateResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from core import forms

def get_post_data(request):
    data = dict()
    for key, value in request.POST.items():
        data[key] = value
    return data

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        register_form = forms.RegisterForm(request.POST)
        if register_form.is_valid():
            user = register_form.save()
            user.refresh_from_db()
            user.save()
            raw_password = register_form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return JsonResponse({"success": True})
        return JsonResponse({
            "success": False,
            "error": register_form.error_messages
        })
    return JsonResponse({"success": False, "error": "Not a POST request"})


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True, "username": username})
        return JsonResponse({"success": False, "username": username, "data": get_post_data(request)})
    else:
        return TemplateResponse(request, 'index.html')
    return JsonResponse({
        "success": False,
        "username": request.GET.get('username', ''),
        "error": "Not a POST request"
    })


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"success": True})


@csrf_exempt
def current_user(request):
    data = {'logged_in': False, 'username': ""}
    if request.user.is_authenticated:
        data['logged_in'] = True
        data['username'] = request.user.username
    return JsonResponse(data)


@login_required
@csrf_exempt
def update_profile(request):
    if request.method == "POST":
        user_form = forms.UserForm(request.POST, instance=request.user)
        profile_form = forms.ProfileForm(
            request.POST, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return JsonResponse({"updated": True})
        return JsonResponse({"updated": False, "error": "Unknonwn error"})
    return JsonResponse({
        "user": {
            "username": request.user.username,
            "email": request.user.email,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name
        },
        "profile": {
            "location": request.user.profile.location,
            "wakatime_api": request.user.profile.wakatime,
            "wunderground_api": request.user.profile.wunderground,
        }
    })
