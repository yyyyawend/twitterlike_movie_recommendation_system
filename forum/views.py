from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from forum.models import Post, Like, Comment
from forum.serializers import PostCreateSerializer, PostDetailSerializer, LikeSerializer, CommentCreateSerializer


class PostCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            posts = Post.objects.all()
            posts_serializer = PostDetailSerializer(posts, many=True, context={'request': request})
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]


class LikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):

        post = get_object_or_404(Post, pk=request.data["post"])
        like = Like.objects.filter(post=post, user_id=request.data["user"])
        if like:
            like.delete()
            return Response({'likes_count': post.likes.count()})
        else:
            serializer = LikeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'likes_count': post.likes.count()}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentCreateView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentCreateSerializer
    permission_classes = [IsAuthenticated]
