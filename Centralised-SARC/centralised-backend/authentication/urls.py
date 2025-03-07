from django.urls import path
from .views import RegisterView, LoginView, ProfileView,VerifyEmailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
     path("verify-email/<uuid:token>/", VerifyEmailView.as_view(), name="verify-email"),
]
