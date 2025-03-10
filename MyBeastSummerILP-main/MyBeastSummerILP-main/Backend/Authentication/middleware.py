import requests
from django.http import JsonResponse

class TokenAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        print("🔹 Middleware Initialized")

    def __call__(self, request):
        print(f"🔹 Middleware Called for {request.path}")
        
        # Check if Authorization header is present
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            print("🔸 Authorization header is missing")
            return JsonResponse({'error': 'Unauthorized - No Authorization header'}, status=401)
        
        if not auth_header.startswith("Bearer "):
            print("🔸 No valid token found in headers")
            return JsonResponse({'error': 'Unauthorized - Invalid header format'}, status=401)

        token = auth_header.split("Bearer ")[1].strip()
        if not token:
            print("🔸 Token missing in request")
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
                minimal_user_data = {
                    'name': user_data.get('name'),
                    'roll_number': user_data.get('roll_number')
                }
                request.auth_user = minimal_user_data  # ✅ Set the user data on the request
                print(f"✅ User authenticated successfully: {minimal_user_data}")
            else:
                print(f"❌ Token validation failed with status code {response.status_code}")
                return JsonResponse({'error': 'Invalid token'}, status=401)

        except requests.RequestException as e:
            print(f"❌ Error contacting centralized backend: {str(e)}")
            return JsonResponse({'error': 'Auth service unreachable'}, status=503)

        # Continue with the request processing
        response = self.get_response(request)
        return response
