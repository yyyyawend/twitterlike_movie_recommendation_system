from django.urls import path

from forum.views import PostCreateView, PostListView

urlpatterns = [
    path('api/create_post', PostCreateView.as_view(), name='post_create'),

    path('api/post_list', PostListView.as_view(), name='post_list'),
]
