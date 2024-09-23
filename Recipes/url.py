from django.contrib import admin
from django.urls import path,include
from . import views as Recipe

urlpatterns = [
    path('',Recipe.home,name='home'),
    path('recipe/',Recipe.recipes,name='recipepage'),
    path('recipes/<int:id>/',Recipe.Individual,name='IndividualRecipe'),
    path('recipe/<str:course>/',Recipe.Course,name='Course'),
    path('filter/',Recipe.Filter,name='Filter'),
]