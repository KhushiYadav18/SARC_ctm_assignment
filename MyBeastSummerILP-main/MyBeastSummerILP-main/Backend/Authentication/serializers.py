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
    class Meta:
        model = Profile
        fields = '__all__'
        