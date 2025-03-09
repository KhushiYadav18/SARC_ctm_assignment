from django.urls import path
from .views import CreateUserAPIView, TokenVerification, Login, ProfileView

urlpatterns = [
    path('create-user/', CreateUserAPIView.as_view(), name='create-user'),
    path('verify-user/{token}', TokenVerification.as_view(), name='token-verification'),
    path('login/', Login.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
