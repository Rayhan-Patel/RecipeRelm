from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import login,logout,authenticate
import json

@api_view(['POST'])
def Signup(request):
    if request.GET.get('password1')==request.GET.get('password2'):
        user=User.objects.create_user(request,username=request.GET.get('username'),email=request.GET.get('email'),password=request.GET.get('password1'))
        login(request,user)
        return response ({'login_stauts':'false'})
    else:
        return response({'error':'Username Exist.'})
        
@api_view(['POST'])
def Login(request):
    if request.method=='POST':
        username=request.GET.get('username')
        email=request.GET.get('email')
        password=request.GET.get('password')
        user=authenticate(request,username=username,password=password)
        if user is None:
            return Response({'message':'Invalid Credentials'})
        else:
            return Response({'messege':'login success'})
    else:
        return Response({'messege':'login failed'})

@api_view(['GET'])
def Logout(request):
    logout(request)
    return response({'login_status':'false'})