from rest_framework import serializers
from .models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    readonly_fields = ('accessToken', 'id')
    class Meta:
        model = User
        exclude = ['is_active']
        
class MiniUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['ldap', 'fullname']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.fullname', read_only=True)
    roll_number = serializers.CharField(source='user.ldap', read_only=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'personal_email', 'linkedin', 'resume_link', 'asc_ss_link', 
                  'projects', 'internships', 'pors', 'user', 'username', 'roll_number']