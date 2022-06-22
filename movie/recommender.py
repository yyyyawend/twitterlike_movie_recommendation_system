import pandas as pd
from surprise import Reader, Dataset, SVD

from movie.models import Rating, Movie


def content_base_recommendations(movie, num):
    cosine_sim = pd.read_csv('./cosine_sim.csv')

    indices = pd.read_csv('sim_to_movie.csv', header=None)
    sim_to_movie = indices[1]

    movie_to_sim = indices.set_index(1)
    movie_to_sim = movie_to_sim[0]

    idx = movie_to_sim[movie.id]
    sim_scores = list(enumerate(cosine_sim[str(idx)]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:num]
    movie_indices = [sim_to_movie[i[0]] for i in sim_scores]
    return movie_indices


def svd_recommendations(movies, userid, num):
    reader = Reader(rating_scale=(1, 10))
    df = pd.DataFrame(list(Rating.objects.all().values('user', 'movie', 'rating')))
    data = Dataset.load_from_df(df, reader)
    trainset = data.build_full_trainset()
    algo = SVD()
    algo.fit(trainset)
    movies['est'] = movies['id'].apply(lambda x: algo.predict(userid, x).est)
    movies_r = list(movies.sort_values('est', ascending=False)[:num]['id'])
    return movies_r


def hybrid_recommendations(movie, userid, num):
    movies_id = content_base_recommendations(movie, num + 2)
    movies_df = pd.DataFrame(movies_id, columns=['id'])
    recommendations_id = svd_recommendations(movies_df, userid, num)
    return recommendations_id


def top_movies(num):
     movies=Movie.objects.all()
     movies_s=MovieDetailSerializer(movies,many=True)
     df=pd.DataFrame(movies_s.data)
     m = df['vote_count'].quantile(0.80)
     q_movies = df[df['vote_count'] >= m]
     C = df['vote_average'].mean()

     def weighted_rating(x):
        v = x['vote_count']
        print(type(v))
        R = x['vote_average']
        # Compute the weighted score
        return (v/(v+m) * R) + (m/(m+v) * C)

     q_movies['score'] = q_movies.apply(weighted_rating, axis=1)
     q_movies = q_movies.sort_values('score', ascending=False)
     return list(q_movies[['id']].head(num))



