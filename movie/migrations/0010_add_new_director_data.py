from django.core.exceptions import ObjectDoesNotExist
from django.db import migrations
import pickle
import os

current_path = os.path.dirname(__file__)
f = open(current_path + '/new_directors.pkl', 'rb')
directors = list(pickle.load(f))
f.close()


def add_director_data(apps, schema_editor):
    director_class = apps.get_model('movie', 'Director')
    for i in range(len(directors)):
        director = directors[i]
        try:
            duplicate_object = director_class.objects.get(
                id=i + 1,
                name=director,
            )
            print('Duplicate instructor entry not added to director table:', director)
        except ObjectDoesNotExist:
            director_object = director_class.objects.create(
                name=director,
            )


def remove_director_data(apps, schema_editor):
    director_class = apps.get_model('movie', 'Director')
    for i in range(len(directors)):
        director = directors[i]
        director_object = director_class.objects.get(
            id=i + 1,
            name=director,
        )
        director_object.delete()


class Migration(migrations.Migration):
    dependencies = [
        ('movie', '0009_add_rating_data'),
    ]

    operations = [
        migrations.RunPython(
            add_director_data,
            remove_director_data
        )
    ]
