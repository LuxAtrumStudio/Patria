from django.urls import path, include

from . import views
from . import location

urlpatterns = [
    path('home.json', views.home),
    path('location.json', location.location),
    path('location_list.json', location.location_list),
    path('wunderground.json', views.wunderground),
]
