from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class ForumUser(models.Model):
    user = models.OneToOneField(User, related_name='forumUser', on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    location = models.CharField(max_length=220, null=True, blank=True)
    biography = models.TextField(blank=True, null=True)
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
