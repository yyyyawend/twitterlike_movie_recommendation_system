from .views import MovieListView, RatingCreateView, MovieTagsView
from django.urls import path

urlpatterns = [
    path('api/movies', MovieListView.as_view(), name='movies'),
    path('api/rating', RatingCreateView.as_view(), name='rating'),
    path('api/tags', MovieTagsView.as_view(), name='tags'),
]
