from django.core.exceptions import ObjectDoesNotExist
from django.db import migrations
import pickle
import os

current_path = os.path.dirname(__file__)
f = open(current_path + '/new_movies.pkl', 'rb')
movies = pickle.load(f)
f.close()

def add_movie_many_to_many_data(apps, schema):
    # This should do the reverse
    movie_class = apps.get_model('movie', 'Movie')
    star_class = apps.get_model('movie', 'Star')
    director_class = apps.get_model('movie', 'Director')
    genres_class=apps.get_model('movie', 'Genres')
    for index, movie in movies.iterrows():
        m=movie_class.objects.get(
                year=movie['year'],
                title=movie['title'],
            )
        for star in movie["stars"]:
            m.stars.add(star_class.objects.get(
                id=star
            ))
        for director in movie["directors"]:
            m.directors.add(director_class.objects.get(
                    id=director
                ))
        for genre in movie["genres"]:
            m.genres.add(genres_class.objects.get(
                id=genre
            ))

def delete_movie_many_to_many_data(apps, schema):
    # This should do the reverse
    movie_class = apps.get_model('movie', 'Movie')
    star_class = apps.get_model('movie', 'Star')
    director_class = apps.get_model('movie', 'Director')
    genres_class=apps.get_model('movie', 'Genres')
    for index, movie in movies.iterrows():
        m=movie_class.objects.get(
                year=movie['year'],
                title=movie['title'],
            )
        for star in movie["stars"]:
            m.stars.remove(star_class.objects.get(
                id=star
            ))
        for director in movie["directors"]:
            m.directors.add(director_class.objects.get(
                    id=director
                ))
        for genre in movie["genres"]:
            m.genres.remove(genres_class.objects.get(
                id=genre
            ))


class Migration(migrations.Migration):
    dependencies = [
        ('movie', '0012_add_new_movie_data'),
    ]

    operations = [
        migrations.RunPython(
            add_movie_many_to_many_data,
            delete_movie_many_to_many_data
        )
    ]
