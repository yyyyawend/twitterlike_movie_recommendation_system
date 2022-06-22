from django.contrib import admin

# Register your models here.
from forum.models import Post, Like, Comment

admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Comment)
