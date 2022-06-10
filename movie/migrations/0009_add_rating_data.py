from django.core.exceptions import ObjectDoesNotExist
from django.db import migrations
import pickle
import os

current_path = os.path.dirname(__file__)
f = open(current_path + '/ratings.pkl', 'rb')
ratings = pickle.load(f)
f.close()


def add_rating_data(apps, schema_editor):
    rating_class = apps.get_model('movie', 'Rating')

    for rating in ratings:
        try:
            duplicate_object = rating_class.objects.get(
                user_id=rating['user'],
                movie_id=rating['movie'],
                rating=rating['rating'],
            )
            print('Duplicate instructor entry not added to rating table:', rating['id'])
        except ObjectDoesNotExist:
            rating_object = rating_class.objects.create(
                user_id=rating['user'],
                movie_id=rating['movie'],
                rating=rating['rating']
            )
#
def remove_rating_data(apps, schema_editor):
    rating_class = apps.get_model('movie', 'Rating')
    for rating in ratings:
        rating_object = rating_class.objects.get(
            user_id=rating['user'],
            movie_id=rating['movie'],
            rating=rating['rating']
        )
        rating_object.delete()

class Migration(migrations.Migration):
    dependencies = [
        ('movie', '0008_rating'),
    ]

    operations = [
        migrations.RunPython(
            add_rating_data,
            remove_rating_data
        )
    ]
