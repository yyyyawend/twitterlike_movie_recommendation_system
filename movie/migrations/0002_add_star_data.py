from django.core.exceptions import ObjectDoesNotExist
from django.db import migrations
import pickle
import os

current_path = os.path.dirname(__file__)
f = open(current_path + '/stars.pkl', 'rb')
stars = list(pickle.load(f))
f.close()


def add_star_data(apps, schema_editor):
    star_class = apps.get_model('movie', 'Star')
    for i in range(len(stars)):
        star = stars[i]
        try:
            duplicate_object = star_class.objects.get(
                id=i + 1,
                name=star,
            )
            print('Duplicate instructor entry not added to star table:', star)
        except ObjectDoesNotExist:
            star_object = star_class.objects.create(
                name=star,
            )


def remove_star_data(apps, schema_editor):
    star_class = apps.get_model('movie', 'Star')
    for i in range(len(stars)):
        star = stars[i]
        star_object = star_class.objects.get(
            id=i + 1,
            name=star,
        )
        star_object.delete()


class Migration(migrations.Migration):
    dependencies = [
        ('movie', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(
            add_star_data,
            remove_star_data
        )
    ]
