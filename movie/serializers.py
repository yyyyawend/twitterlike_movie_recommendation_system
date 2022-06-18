import pandas as pd
from rest_framework import serializers

from movie.models import Movie, Rating, Star, Director, Genres
from movie.recommender import hybrid_recommendations



class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

    def create(self, validated_data):
        rating, created = Rating.objects.update_or_create(
            user=validated_data.get('user'),
            movie=validated_data.get('movie'),
            defaults={'rating': validated_data.get('rating')},
        )
        return rating

class MovieTagsSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source='title')

    class Meta:
        model = Movie
        fields = ('value', 'id','year')

class StarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Star
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = '__all__'

class MovieCardSerializer(serializers.ModelSerializer):
    vote_average = serializers.SerializerMethodField()
    genres = GenresSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ('id','title','year','image_url','releaseDate','genres','vote_average')

    def get_vote_average(self, obj):
        return obj.calculate_vote_average()

class MovieDetailSerializer(serializers.ModelSerializer):
    stars = StarSerializer(many=True, read_only=True)
    directors = DirectorSerializer(many=True, read_only=True)
    genres = GenresSerializer(many=True, read_only=True)
    vote_average = serializers.SerializerMethodField()
    recommendations=serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ('id','title','year','image_url','releaseDate','overview','stars','directors','genres','vote_average','recommendations')

    def get_vote_average(self, obj):
        return obj.calculate_vote_average()

    def get_recommendations(self,obj):
        movie_ids=content_base_recommendations(obj,10)
        movies= Movie.objects.filter(id__in=movie_ids)
        movies_serializer=MovieCardSerializer(movies, many=True)
        return movies_serializer.data

    def get_recommendations(self,obj):
        request = self.context.get('request', None)
        if request.user:
            user=request.user
            movie_ids=hybrid_recommendations(obj,user.id,10)
            movies= Movie.objects.filter(id__in=movie_ids)
            movies_serializer=MovieCardSerializer(movies, many=True)
            return movies_serializer.data


