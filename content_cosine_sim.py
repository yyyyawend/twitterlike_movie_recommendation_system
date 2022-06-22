
import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "movie_recommendation.settings")
django.setup()

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

from movie.models import Movie



def main():
    df = pd.DataFrame(list(Movie.objects.all().values('id', 'overview')))
    tfidf = TfidfVectorizer(stop_words='english')
    df['overview'] = df['overview'].fillna('')
    tfidf_matrix = tfidf.fit_transform(df['overview'])
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    indices = pd.Series(df['id'], index=df.index).drop_duplicates()
    pd.DataFrame(cosine_sim).to_csv('cosine_sim.csv')
    indices.to_csv('sim_to_movie.csv',header=False)

if __name__ == "__main__":
    main()
