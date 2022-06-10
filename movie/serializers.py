import pandas as pd
from rest_framework import serializers

from movie.models import Movie, Rating
from surprise import SVD, Dataset, Reader

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


class MovieSerializer(serializers.ModelSerializer):
    vote_average = serializers.SerializerMethodField()
    # svd_recommendations = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = '__all__'

    def get_vote_average(self, obj):
        ratings = obj.ratings.all().values_list('rating', flat=True)
        return format(sum(ratings) / len(ratings), '.1f')

    # def get_content_base_recommendations(self, movie):
    #     cosine_sim = pd.read_csv('./cosine_sim.csv')
    #
    #     indices=pd.read_csv('sim_to_movie.csv', header=None)
    #     sim_to_movie = indices[1]
    #
    #     movie_to_sim=indices.set_index(1)
    #     movie_to_sim=movie_to_sim[0]
    #
    #     idx = movie_to_sim[movie.id]
    #     sim_scores = list(enumerate(cosine_sim[str(idx)]))
    #     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    #     sim_scores = sim_scores[1:11]
    #     movie_indices = [sim_to_movie[i[0]] for i in sim_scores]
    #     return movie_indices
    #
    # def get_svd_recommendations(self,movies):
    #     reader = Reader(rating_scale=(1, 10))
    #     df=pd.DataFrame(list(Rating.objects.all().values('user','movie','rating')))
    #     data = Dataset.load_from_df(df, reader)
    #     trainset = data.build_full_trainset()
    #     algo = SVD()
    #     algo.fit(trainset)
    #     movies=df[['movie']].drop_duplicates()
    #     movies['est'] = movies['movie'].apply(lambda x: algo.predict(1,x).est)
    #     movies_r = list(movies.sort_values('est', ascending=False)[:10]['movie'])
    #     return movies_r
    #
    # def hybrid_recommendations(self):
    #     pass



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
