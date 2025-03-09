from .models import Blog
from rest_framework import serializers
from Authentication.serializers import MiniUserSerializer
from Projects.serializers import ProjectSerializer

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['interview_project'] = ProjectSerializer(instance.interview_project).data if instance.interview_project else {}
        response['interview_schedule_or_shortlisted_students_or_final_students'] = MiniUserSerializer(instance.interview_schedule_or_shortlisted_students_or_final_students.all(), many=True).data
        return response
