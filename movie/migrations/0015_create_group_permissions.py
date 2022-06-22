from __future__ import unicode_literals
from itertools import chain

from django.db import migrations


def populate_permissions_lists(apps):
    permission_class = apps.get_model('auth', 'Permission')

    movie_permissions = permission_class.objects.filter(content_type__app_label='movie',
                                                        content_type__model='movie')

    star_permissions = permission_class.objects.filter(content_type__app_label='movie',
                                                       content_type__model='star')

    director_permissions = permission_class.objects.filter(content_type__app_label='movie',
                                                           content_type__model='director')

    post_permissions = permission_class.objects.filter(content_type__app_label='forum',
                                                       content_type__model='post')

    comment_permissions = permission_class.objects.filter(content_type__app_label='forum',
                                                          content_type__model='comment')

    like_permissions = permission_class.objects.filter(content_type__app_label='forum',
                                                       content_type__model='like')

    forumUser_permissions = permission_class.objects.filter(content_type__app_label='forumUser',
                                                            content_type__model='forumuser')

    follow_permissions = permission_class.objects.filter(content_type__app_label='forumUser',
                                                         content_type__model='follow')

    perm_view_movie = permission_class.objects.filter(content_type__app_label='movie',
                                                      content_type__model='movie',
                                                      codename='view_movie')

    perm_view_star = permission_class.objects.filter(content_type__app_label='movie',
                                                     content_type__model='star',
                                                     codename='view_star')

    perm_view_director = permission_class.objects.filter(content_type__app_label='movie',
                                                         content_type__model='director',
                                                         codename='view_director')

    perm_view_post = permission_class.objects.filter(content_type__app_label='forum',
                                                     content_type__model='post',
                                                     codename='view_post')

    perm_view_comment = permission_class.objects.filter(content_type__app_label='forum',
                                                        content_type__model='comment',
                                                        codename='view_comment')

    perm_view_like = permission_class.objects.filter(content_type__app_label='forum',
                                                     content_type__model='like',
                                                     codename='view_like')

    perm_view_forumUser = permission_class.objects.filter(content_type__app_label='forumUser',
                                                          content_type__model='forumuser',
                                                          codename='view_forumuser')

    perm_view_follow = permission_class.objects.filter(content_type__app_label='forumUser',
                                                       content_type__model='follow',
                                                       codename='view_follow')

    mp_staff_permissions = chain(perm_view_movie,
                                 perm_view_star,
                                 perm_view_director,
                                 perm_view_post,
                                 perm_view_comment,
                                 perm_view_like,
                                 perm_view_forumUser,
                                 perm_view_follow)

    mp_post_admin_permissions = chain(perm_view_movie,
                                      perm_view_star,
                                      perm_view_director,
                                      post_permissions,
                                      comment_permissions,
                                      like_permissions,
                                      perm_view_forumUser,
                                      perm_view_follow)

    mp_forumUser_admin_permissions = chain(perm_view_movie,
                                           perm_view_star,
                                           perm_view_director,
                                           perm_view_post,
                                           perm_view_comment,
                                           perm_view_like,
                                           forumUser_permissions,
                                           follow_permissions)

    mp_movie_admin_permissions = chain(movie_permissions,
                                       star_permissions,
                                       director_permissions,
                                       perm_view_post,
                                       perm_view_comment,
                                       perm_view_like,
                                       perm_view_forumUser,
                                       perm_view_follow)

    my_groups_initialization_list = [
        {
            "name": "mp_staff",
            "permissions_list": mp_staff_permissions,
        },
        {
            "name": "mp_post_admin",
            "permissions_list": mp_post_admin_permissions,
        },
        {
            "name": "mp_forumUser_admin",
            "permissions_list": mp_forumUser_admin_permissions,
        },
        {
            "name": "mp_movie_admin",
            "permissions_list": mp_movie_admin_permissions,
        },
    ]
    return my_groups_initialization_list


def add_group_permissions_data(apps, schema_editor):
    groups_initialization_list = populate_permissions_lists(apps)

    group_model_class = apps.get_model('auth', 'Group')
    for group in groups_initialization_list:
        if group['permissions_list'] is not None:
            group_object = group_model_class.objects.get(
                name=group['name']
            )
            group_object.permissions.set(group['permissions_list'])
            group_object.save()


def remove_group_permissions_data(apps, schema_editor):
    groups_initialization_list = populate_permissions_lists(apps)

    group_model_class = apps.get_model('auth', 'Group')
    for group in groups_initialization_list:
        if group['permissions_list'] is not None:
            group_object = group_model_class.objects.get(
                name=group['name']
            )
            list_of_permissions = group['permissions_list']
            for permission in list_of_permissions:
                group_object.permissions.remove(permission)
                group_object.save()


class Migration(migrations.Migration):
    dependencies = [
        ('movie', '0014_create_groups'),
    ]

    operations = [
        migrations.RunPython(
            add_group_permissions_data,
            remove_group_permissions_data
        )
    ]
