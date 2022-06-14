from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from forum.models import Post
from forum.serializers import PostSerializer


class PostCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def post(self, request, format=None):
        print(request.data)
        return super(PostCreateView, self).post(request, format=None)
