from rest_framework import serializers
from django.contrib.auth.models import User

# User Serializer
from forumUser.models import ForumUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ForumUserSerializer(serializers.ModelSerializer):
    username= serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ForumUser
        fields = ["id","username","avatar","location","biography"]

    def get_username(self, obj):
        return obj.user.username
