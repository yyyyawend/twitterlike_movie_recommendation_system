from django.urls import path

from forum.views import PostCreateView, PostListView, LikeView, CommentCreateView

urlpatterns = [
    path('api/create_post', PostCreateView.as_view(), name='post_create'),

    path('api/post_list', PostListView.as_view(), name='post_list'),

    path('api/post_like', LikeView.as_view(), name='post_like'),

    path('api/post_comment', CommentCreateView.as_view(), name='post_comment'),
]
