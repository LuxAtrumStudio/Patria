from django.urls import path

from api import weather_views

urlpatterns = [
        path('weather', weather_views.weather),
        path('weather/daily', weather_views.weather_daily),
        ]
