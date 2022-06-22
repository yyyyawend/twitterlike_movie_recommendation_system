from django.http import Http404
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .top_movies import get_top_movies


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
        return Response({
            'vote_average': movie.vote_average,
            'data': response.data
        })


class MovieTagsView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieTagsSerializer
    pagination_class = None


class MovieDetailView(RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieDetailSerializer

class TopMoviesView(APIView):
    def get(self,request):
         try:
            top_movies=get_top_movies(15)
         except:
            raise Http404
         return Response({"top_movies":top_movies})
