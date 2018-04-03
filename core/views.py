from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True, "username": username})
        else:
            return JsonResponse({"success": False, "username": username})
    else:
        return JsonResponse({"success": False, "username": request.GET.get('username', '')})

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

