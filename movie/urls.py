from .views import MovieListView, RatingCreateView, MovieTagsView, MovieDetailView
from django.urls import path

urlpatterns = [
    path('api/movies', MovieListView.as_view(), name='movies'),
    path('api/rating', RatingCreateView.as_view(), name='rating'),
    path('api/tags', MovieTagsView.as_view(), name='tags'),
    path('api/movies/<int:pk>', MovieDetailView.as_view(), name='movie_detail'),
]

