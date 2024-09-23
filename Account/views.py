from django.shortcuts import render
from .models import Account
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import login,logout,authenticate
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
@api_view(['POST'])
@ensure_csrf_cookie  # Ensure CSRF token is set for the request
def Login(request):
    if request.method == 'POST':
        username = request.data.get('name')
        password = request.data.get('password1')
        user = authenticate(username=username, password=password)
        if user:
            login(request,user)
        else:
            return Response({'error':'Invalid Credentials'})

@api_view(['POST'])
@ensure_csrf_cookie
def Signup(request):
    username = request.data.get('name')
    email = request.data.get('email')
    password1 = request.data.get('password1')
    password2 = request.data.get('password2')
    
    # Check if passwords match
    if password1 != password2:
        return Response({'error': 'Passwords do not match'}, status=400)
    
    # Check if username already exists
    if Account.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    
    # Create the user
    user = Account.objects.create_user(username=username, email=email, password=password1)  # Use create_user to hash the password
    user.save()

    # Optionally, you can log the user in after signup
    login(request, user)

    return Response({'message': 'User created successfully'}, status=201)


@api_view(['GET'])
def LoginStatus(request):
    # Use the Django authentication system to check if the user is authenticated
    if request.user.is_authenticated:
        return Response(True)
    else:
        return Response(False)
