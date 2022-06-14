from django.db import models

# Create your models here.
from forumUser.models import ForumUser
from movie.models import Movie


class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)
    text = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True, default=None)
    user = models.ForeignKey(ForumUser, related_name='posts', on_delete=models.CASCADE)
    movie = models.ManyToManyField(Movie, blank=True)
    likes = models.ManyToManyField(ForumUser, blank=True, through="Like")
    timestamp = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    user = models.ForeignKey(ForumUser, related_name='likes', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
