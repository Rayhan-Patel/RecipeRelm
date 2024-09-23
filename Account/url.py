from django.contrib import admin
from django.urls import path,include
from . import views as Account

urlpatterns = [
    path('Login/',Account.Login,name='Login'),
    path('Signup/',Account.Signup,name='Signup'),
    path('LoginStatus/',Account.LoginStatus,name='LoginStatus')
]