from django.core.exceptions import ObjectDoesNotExist
from django.db import migrations


def add_forumUser_data(apps, schema):
    # This should do the reverse
    forumUser_class = apps.get_model('forumUser', 'ForumUser')
    for i in range(7, 101):
        try:
            duplicate_object = forumUser_class.objects.get(
                user_id=i,
            )
            print('Duplicate instructor entry not added to forumUser table:', user)
        except ObjectDoesNotExist:
            forumUser_object = forumUser_class.objects.create(
                user_id=i
            )


def delete_forumUser_data(apps, schema):
    # This should do the reverse
    forumUser_class = apps.get_model('forumUser', 'ForumUser')
    for i in range(7, 101):
        forumUser_object = forumUser_class.objects.get(
            user_id=i,
        )
        forumUser_object.delete()


class Migration(migrations.Migration):
    dependencies = [
        ('forumUser', '0002_add_user_data'),
    ]

    operations = [
        migrations.RunPython(
            add_forumUser_data,
            delete_forumUser_data
        )
    ]
