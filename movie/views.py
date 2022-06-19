from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import *


class MovieListView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieCardSerializer


class RatingCreateView(CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    # def post(self, request, format=None):
    #     print(request.data)
    #     return super(RatingCreateView, self).post(request, format=None)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        movie = Movie.objects.filter(id=request.data['movie']).first()
        vote_average = movie.calculate_vote_average()
        return Response({
            'vote_average': vote_average,
            'data': response.data
        })


class MovieTagsView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieTagsSerializer
    pagination_class = None


class MovieDetailView(RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieDetailSerializer
