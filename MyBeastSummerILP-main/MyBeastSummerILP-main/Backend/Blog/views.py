from django.shortcuts import render
from .models import Blog
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BlogSerializer
from rest_framework import status


# Create your views here.
class BlogAPIView(APIView):
    def get(self, request):
        blogs = Blog.objects.all().order_by('-id')
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
