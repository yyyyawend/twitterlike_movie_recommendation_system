from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView
from .serializers import *

import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

class MovieListView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class RatingCreateView(CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def post(self, request, format=None):
        print(request.data)
        return super(RatingCreateView, self).post(request, format=None)








    # def create_soup(self,x):
    #     return ' '.join(x['keywords']) + ' ' + ' '.join(x['cast']) + ' ' + x['director'] + ' ' + ' '.join(x['genres'])
    #
    # def sanitize(self, x):
    #     if isinstance(x, list):
    #         #Strip spaces and convert to lowercase
    #         return [str.lower(i.replace(" ", "")) for i in x]
    #     else:
    #         #Check if director exists. If not, return empty string
    #         if isinstance(x, str):
    #             return str.lower(x.replace(" ", ""))
    #         else:
    #             return ''








