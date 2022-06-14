from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView
from rest_framework.response import Response

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

    # def post(self, request, format=None):
    #     print(request.data)
    #     return super(RatingCreateView, self).post(request, format=None)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        movie=Movie.objects.filter(id=request.data['movie']).first()
        vote_average=movie.calculate_vote_average()
        return Response({
            'vote_average': vote_average,
            'data': response.data
        })

class MovieTagsView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieTagsSerializer
    pagination_class = None







