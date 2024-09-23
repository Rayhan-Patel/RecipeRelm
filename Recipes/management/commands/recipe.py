import csv
import os
from django.core.management.base import BaseCommand
from Recipes.models import Recipes

class Command(BaseCommand):
    help = 'Load recipes from a CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']

        if not os.path.exists(csv_file):
            self.stdout.write(self.style.ERROR(f"File {csv_file} does not exist"))
            return

        with open(csv_file, newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                    Recipes.objects.create(
                        Name=row['name'],
                        Cuisine=row['cuisine'],
                        Course=row['course'],
                        Diet=row['diet'],
                        Description=row['description'],
                        Ingredients_name=row['ingredients_name'],
                        Ingredients_quantity=row['ingredients_quantity'],
                        Instructions=row['instructions'],
                        Prep_time=row['prep_time (in mins)'],
                        Cook_time=row['cook_time (in mins)'],
                        Image_url=row['image_url'],
                    )

        self.stdout.write(self.style.SUCCESS(f"Successfully imported {csv_file}"))
