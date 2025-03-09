from django.urls import path
from .views import BlogAPIView

urlpatterns = [
    path('fetch', BlogAPIView.as_view(), name='Blog'),
]