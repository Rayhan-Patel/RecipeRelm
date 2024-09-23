from django.shortcuts import render
from .models import Recipes
from django.core.paginator import Paginator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.cache import cache
import json
from googletrans import Translator


CUISINE=Recipes.objects.values('Cuisine').distinct()
DIET=Recipes.objects.values('Diet').distinct()
# Create your views here.
@api_view(['GET'])
def home(request):
    fetched_recipes=Recipes.objects.values('Recipe_id','Name','Description','Cuisine','Prep_time','Cook_time','Diet','Image_url').order_by('?')[:6]
    random_recipes=[]
    for recipe in fetched_recipes:
        random_recipes.append({
            'id':recipe['Recipe_id'],
            'name':recipe['Name'],
            'description':recipe['Description'],
            'cuisine':recipe['Cuisine'],
            'prep_time':recipe['Prep_time'],
            'cook_time':recipe['Cook_time'],
            'diet':recipe['Diet'],
            'image_url':recipe['Image_url'],
            })  
    return Response({'random_recipe':random_recipes})

@api_view(['GET'])
def recipes(request):
    search=request.GET.get('search')
    if search:
        recipes=Recipes.objects.filter(Name__icontains=search)
        paginator = Paginator(recipes, 20) 
        page_number = request.GET.get('page') or 1  
        page_obj = paginator.get_page(page_number)
        # Prepare the response data
        response_data = {
            'recipes': list(page_obj.object_list.values('Recipe_id','Name','Description','Cuisine','Course','Prep_time','Cook_time','Diet','Image_url')),
            'total_pages': paginator.num_pages,
            'current_page': page_obj.number,
            'cuisine':CUISINE,
            'diet':DIET
        }

        return Response(response_data)
    else:
        recipes = Recipes.objects.all()
        paginator = Paginator(recipes, 20) 
        page_number = request.GET.get('page') or 1  
        page_obj = paginator.get_page(page_number)
        # Prepare the response data
        response_data = {
            'recipes': list(page_obj.object_list.values('Recipe_id','Name','Description','Cuisine','Course','Prep_time','Cook_time','Diet','Image_url')),
            'total_pages': paginator.num_pages,
            'current_page': page_obj.number,
            'cuisine':CUISINE,
            'diet':DIET
        }

        return Response(response_data)

@api_view(['GET'])
def Individual(request,id):
    recipe = Recipes.objects.filter(Recipe_id=id)
    return Response({'recipe':recipe.values()})

@api_view(['GET'])
def Course(request,course):
    recipes = Recipes.objects.filter(Course__icontains=course)
    paginator = Paginator(recipes, 20) 
    page_number = request.GET.get('page') or 1  
    page_obj = paginator.get_page(page_number)

    # Prepare the response data
    response_data = {
        'recipes': list(page_obj.object_list.values('Recipe_id','Name','Description','Cuisine','Course','Prep_time','Cook_time','Diet','Image_url')),
        'total_pages': paginator.num_pages,
        'current_page': page_obj.number,
        'cuisine':CUISINE,
        'diet':DIET
    }
    return Response(response_data)

@api_view(['GET'])
def Filter(request):    
    cuisine = request.GET.get('cuisine', None)
    diet = request.GET.get('diet', None)
    course = request.GET.get('course', None)
    prep_time = request.GET.get('Prep_time', None)
    cook_time = request.GET.get('Cook_time', None)

    # Start with all recipes
    recipes = Recipes.objects.all()
    print(prep_time)
    # Apply filters dynamically
    if cuisine:
        recipes = recipes.filter(Cuisine__icontains=cuisine)
    if diet:
        recipes = recipes.filter(Diet__icontains=diet)
    if course:
        recipes = recipes.filter(Course__icontains=course)
    if prep_time:
        recipes = recipes.filter(Prep_time__lte=prep_time)
    if cook_time:
        recipes = recipes.filter(Cook_time__lte=cook_time)

    # Paginate the filtered results
    paginator = Paginator(recipes, 20)  # 20 recipes per page
    page_number = request.GET.get('page') or 1
    page_obj = paginator.get_page(page_number)
    # Prepare response data
    response_data = {
        'recipes': list(page_obj.object_list.values('Recipe_id', 'Name', 'Description', 'Cuisine', 'Course', 'Prep_time', 'Cook_time', 'Diet', 'Image_url')),
        'total_pages': paginator.num_pages,
        'current_page': page_obj.number,
        'cuisine': CUISINE,
        'diet':DIET
    }

    return Response(response_data)
    