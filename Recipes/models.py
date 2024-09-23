from django.db import models

# Create your models here.
class Recipes(models.Model):
    Recipe_id=models.AutoField(primary_key=True)
    Name=models.CharField(max_length=150)
    Description=models.TextField(default='No Description')
    Cuisine=models.CharField(max_length=50)
    Course=models.CharField(max_length=50)
    Diet=models.CharField(max_length=50)
    Ingredients_name=models.TextField()
    Ingredients_quantity=models.TextField()
    Prep_time=models.IntegerField()
    Cook_time=models.IntegerField()
    Instructions=models.TextField()
    Image_url=models.TextField()

    def __str__(self):
        return self.Name