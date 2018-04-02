from django.urls import path, re_path, include

from . import views
from . import location

urlpatterns = [
    path('home', views.home),
    path('location', location.location),
    path('location_list', location.location_list),
    path('weather', views.weather),
]
