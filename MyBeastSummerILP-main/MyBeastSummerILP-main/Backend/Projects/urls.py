from django.urls import path
from .views import *

urlpatterns = [
    path('', ProjectListAPIView.as_view(), name='mentor-list'),
    path('<field>/', ProjectListAPIView.as_view(), name='mentor-list-field'),
]