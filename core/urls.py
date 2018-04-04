from django.urls import path
# from django.contrib.auth import views as auth_views

from core import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('current/', views.current_user, name='current'),
    path('update/', views.update_profile, name='update_profile'),
    path('register/', views.register_user, name='register_user'),
]
