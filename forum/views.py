from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from forum.models import Post
from forum.serializers import PostCreateSerializer, PostDetailSerializer


class PostCreateView(APIView):
    # queryset = Post.objects.all()
    # serializer_class = PostCreateSerializer
    def post(self, request, format=None):
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            posts = Post.objects.all()
            posts_serializer = PostDetailSerializer(posts, many=True,context={'request': request})
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer

