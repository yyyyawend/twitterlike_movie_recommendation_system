import pandas as pd

from movie.models import Movie
from movie.serializers import MovieScoreSerializer


def get_top_movies(num):
     movies=Movie.objects.all()
     movies_serializer=MovieScoreSerializer(movies,many=True)
     df=pd.DataFrame(movies_serializer.data)
     m = df['vote_count'].quantile(0.80)
     q_movies = df[df['vote_count'] >= m].copy()
     C = df['vote_average'].mean()

     def weighted_rating(x):
        v = x['vote_count']
        R = x['vote_average']
        return (v/(v+m) * R) + (m/(m+v) * C)

     q_movies['score'] = q_movies.apply(weighted_rating, axis=1)
     q_movies = q_movies.sort_values('score', ascending=False)
     results=q_movies[['id','title','year']].head(num)
     return results.to_dict('records')
