from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import migrations
import pickle
import os

current_path = os.path.dirname(__file__)
f = open(current_path + '/users.pkl', 'rb')
users = pickle.load(f)
f.close()


def add_user_data(apps, schema_editor):
    user_class = User
    for index, user in users.iterrows():
        try:
            duplicate_object = user_class.objects.get(

                username=user['username'],
            )
            print('Duplicate instructor entry not added to user table:', user)
        except ObjectDoesNotExist:
            user_object = user_class.objects.create_user(
                username=user['username'],
                password=user['password'],
                email=user['email']
            )


def remove_user_data(apps, schema_editor):
    user_class = User
    for index, user in users.iterrows():
        user_object = user_class.objects.get(
             username=user['username'],
        )
        user_object.delete()


class Migration(migrations.Migration):
    dependencies = [
        ('forumUser', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(
            add_user_data,
            remove_user_data
        )
    ]
