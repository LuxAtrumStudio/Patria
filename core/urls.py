from django.urls import path
# from django.contrib.auth import views as auth_views

from core import views

urlpatterns = [
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('current', views.current_user, name='current'),
]
