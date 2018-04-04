from django.urls import path

from api import weather_views

urlpatterns = [
        path('weather', weather_views.weather),
        path('weather/hourly', weather_views.weather_hourly),
        path('weather/conditions', weather_views.weather_conditions),
        path('weather/astronomy', weather_views.weather_astonomy),
        ]
