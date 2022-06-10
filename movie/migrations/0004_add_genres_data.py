from django.core.exceptions import ObjectDoesNotExist
from django.db import migrations
import pickle
import os

current_path = os.path.dirname(__file__)
f = open(current_path + '/genres.pkl', 'rb')
genres = list(pickle.load(f))
f.close()


def add_genre_data(apps, schema_editor):
    genre_class = apps.get_model('movie', 'Genres')
    for i in range(len(genres)):
        genre = genres[i]
        try:
            duplicate_object = genre_class.objects.get(
                id=i + 1,
                name=genre,
            )
            print('Duplicate instructor entry not added to genre table:', genre)
        except ObjectDoesNotExist:
            genre_object = genre_class.objects.create(
                name=genre,
            )


def remove_genre_data(apps, schema_editor):
    genre_class = apps.get_model('movie', 'Genres')
    for i in range(len(genres)):
        genre = genres[i]
        genre_object = genre_class.objects.get(
            id=i + 1,
            name=genre,
        )
        genre_object.delete()


class Migration(migrations.Migration):
    dependencies = [
        ('movie', '0003_add_director_data'),
    ]

    operations = [
        migrations.RunPython(
            add_genre_data,
            remove_genre_data
        )
    ]
