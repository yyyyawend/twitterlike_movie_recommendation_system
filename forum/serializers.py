from rest_framework import serializers

from forum.models import Post
from forumUser.serializers import ForumUserSerializer
from movie.serializers import MovieSerializer


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostDetailSerializer(serializers.ModelSerializer):
    user = ForumUserSerializer(read_only=True)
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    # movie = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field="title"
    # )
    movie=MovieSerializer(many=True,read_only=True)

    class Meta:
        model = Post
        fields = ["post_id","user","text","image","movie","timestamp"]


    # def get_image_url(self, obj):
    #     request = self.context.get('request')
    #     if obj.image:
    #         print(obj.image)
    #         image_url = obj.image.url
    #         return request.build_absolute_uri(image_url)
    #     else:
    #         return None

