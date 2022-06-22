from django.core.exceptions import ObjectDoesNotExist
from django.db import migrations
import pickle
import os

current_path = os.path.dirname(__file__)
f = open(current_path + '/new_movies.pkl', 'rb')
movies = pickle.load(f)
f.close()


def add_movie_data(apps, schema_editor):
    movie_class = apps.get_model('movie', 'Movie')

    for index, movie in movies.iterrows():
        try:
            duplicate_object = movie_class.objects.get(
                year=movie['year'],
                title=movie['title'],
            )
            print('Duplicate instructor entry not added to movie table:', movie['id'])
        except ObjectDoesNotExist:
            movie_object = movie_class.objects.create(
                title=movie['title'],
                year=movie['year'],
                image_url=movie['image'],
                releaseDate=movie['release_date'],
                runtimeMins=movie['runtimeMins'],
                overview=movie['overview'],
                keywords=str(movie['keywords']),
            )


def remove_movie_data(apps, schema_editor):
    movie_class = apps.get_model('movie', 'Movie')
    for index, movie in movies.iterrows():
        movie_object = movie_class.objects.get(
            year=movie['year'],
            title=movie['title'],
        )
        movie_object.delete()

class Migration(migrations.Migration):
    dependencies = [
        ('movie', '0011_add_new_star_data'),
    ]

    operations = [
        migrations.RunPython(
            add_movie_data,
            remove_movie_data
        )
    ]
