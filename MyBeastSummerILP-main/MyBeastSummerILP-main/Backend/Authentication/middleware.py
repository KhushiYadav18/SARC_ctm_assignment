import requests
from django.http import JsonResponse

class TokenAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        print("🔹 Middleware Initialized")
        
    def process_request(self, request):
        print("Request Headers: ", request.headers)
        print("Authorization Header: ", request.headers.get('Authorization'))

    def __call__(self, request):
        print(f"🔹 Middleware Called for {request.path}")
        
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            return JsonResponse({'error': 'Unauthorized - No Authorization header'}, status=401)
        
        if not auth_header.startswith("Bearer "):
            return JsonResponse({'error': 'Unauthorized - Invalid header format'}, status=401)

        token = auth_header.split("Bearer ")[1].strip()
        if not token:
            return JsonResponse({'error': 'Token required'}, status=401)

        try:
            print(f"🔍 Validating token: {token}")
            response = requests.get(
                "http://127.0.0.1:8000/api/auth/validate-token/",
                headers={"Authorization": f"Bearer {token}"},
                timeout=5
            )
            
            if response.status_code == 200:
                user_data = response.json()
                
                # Fetch complete profile from the central backend
                profile_response = requests.get(
                    "http://127.0.0.1:8000/api/auth/profile/",
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=5
                )
                
                if profile_response.status_code == 200:
                    user_profile = profile_response.json()
                    request.auth_user = {**user_data, **user_profile}
                    print(f"✅ User authenticated successfully with complete profile: {request.auth_user}")
                else:
                    print(f"❌ Profile fetch failed with status code {profile_response.status_code}")
                    return JsonResponse({'error': 'Failed to fetch user profile'}, status=401)
                
            else:
                print(f"❌ Token validation failed with status code {response.status_code}")
                return JsonResponse({'error': 'Invalid token'}, status=401)

        except requests.RequestException as e:
            print(f"❌ Error contacting centralized backend: {str(e)}")
            return JsonResponse({'error': 'Auth service unreachable'}, status=503)

        response = self.get_response(request)
        return response
