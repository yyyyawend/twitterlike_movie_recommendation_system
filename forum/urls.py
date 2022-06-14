from django.urls import path

from forum.views import PostCreateView

urlpatterns = [
    path('api/create_post', PostCreateView.as_view(), name='register'),
]
