from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.generics import ListAPIView, CreateAPIView, get_object_or_404
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from forum.models import Post, Like
from forum.serializers import PostCreateSerializer, PostDetailSerializer, LikeSerializer
from forumUser.models import ForumUser


class PostCreateView(APIView):

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
    permission_classes = [IsAuthenticated]


class LikeView(APIView):

    def post(self, request, format=None):

        post = get_object_or_404(Post, pk=request.data["post"])
        like=Like.objects.filter(post=post,user_id=request.data["user"])
        if like:
            like.delete()
            return Response({'likes_count': post.likes.count()})
        else:
            serializer=LikeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'likes_count': post.likes.count()}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



