from .views import MovieListView, RatingCreateView
from django.urls import path

urlpatterns = [
    path('api/movies', MovieListView.as_view(), name='movies'),
    path('api/rating', RatingCreateView.as_view(), name='rating'),
]
