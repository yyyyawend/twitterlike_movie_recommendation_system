from rest_framework import serializers

from forum.models import Post, Like
from forumUser.serializers import ForumUserSerializer
from movie.serializers import MovieCardSerializer


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class PostDetailSerializer(serializers.ModelSerializer):
    user = ForumUserSerializer(read_only=True)
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    movie = MovieCardSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["post_id", "user", "text", "image", "movie", "timestamp", "likes_count", "liked"]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liked(self, obj):
        request = self.context.get('request', None)
        if request.user:
            user = request.user
            like = Like.objects.filter(post_id=obj.post_id, user_id=user.id)
            if like:
                return True
        else:
            return False


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
