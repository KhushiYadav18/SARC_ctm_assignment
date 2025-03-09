from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, ProfileSerializer
from .models import User, Profile, Token
from django.shortcuts import render
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import smtplib
import os

class CreateUserAPIView(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            token, created = Token.objects.get_or_create(user=user)
            
            print("User created successfully")
            print("Token: ", token)
            
            send_sso_mail(emailid=user.ldap, token=token.token)
            
            response_data = serializer.data.copy()
            response_data.pop('password', None)
            response_data.pop('accessToken', None)
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenVerification(APIView):
    def post(self, request, format=None):
        try:
            token = Token.objects.get(token=request.data['token'])
            user = token.user
            if(user.is_active):
                return Response("User already verified",status=status.HTTP_400_BAD_REQUEST)
            user.is_active = True
            user.save()
            return Response("Verificaiton Successful",status=status.HTTP_200_OK)
        except Exception as e:
            print("Error while verifying token", e)
            return Response("No user found, please signup",status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    def post(self, request, format=None):
        try:
            user = User.objects.get(ldap=request.data['ldap'])
            if(user.is_active == False):
                return Response({"error": "User not verified, please verify your account from your webmail"}, status=status.HTTP_401_UNAUTHORIZED)
            if(user.password == request.data['password']):
                serializer = UserSerializer(user)
                return Response({"accessToken": serializer.data['accessToken']}, status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error while logging in", e)
            return Response({"error":"Invalid Credentials. Did you signup ?"}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    def get(self, request, format=None):
        accessToken = request.query_params.get('accessToken')
        try:
            user = User.objects.get(accessToken=accessToken)
            if(user.is_active == False):
                return Response({"error": "User not verified"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error while fetching user", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(user)
        try:
            profile = Profile.objects.get(user=user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except Exception as e:
            print("Error while fetching profile", e)
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        accessToken = request.data['accessToken']
        try:
            user = User.objects.get(accessToken=accessToken)
            if(user.is_active == False):
                return Response({"error":"User not verified"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error while fetching user", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(user)
        try:
            request.data['user'] = user.id
            if(not Profile.objects.filter(user=user)):
                serializer = ProfileSerializer(data=request.data)
            else:
                profile = Profile.objects.get(user=user)
                serializer = ProfileSerializer(profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("Error while updating profile", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        except Exception as e:
            print("Error while updating profile", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, format=None):
        accessToken = request.data['accessToken']
        try:
            user = User.objects.get(accessToken=accessToken)
            if(user.is_active == False):
                return Response({"error": "User not verified"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error while fetching user", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(user)
        try:
            profile = Profile.objects.get(user=user)
            request.data['user'] = user.id
            serializer = ProfileSerializer(profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("Error while updating profile", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error while updating profile", e)
            return Response(status=status.HTTP_404_NOT_FOUND)




def send_sso_mail(
    mail_subject="User Verification of ILP 2023 | SARC IIT Bombay",
    text_content="Yo man!",
    emailid="akashbanger2@gmail.com",
    token="",
    name="Web CTM SARC",
    sender_email="sarc@iitb.ac.in",
    sender_name="SARC",
    reply_name="SARC",
    reply_to="nikhil@iitb.ac.in",
):
    strFrom = "sarc@iitb.ac.in"
    strTo = emailid
    subject = mail_subject
    text_content = text_content
    token = token
    msgRoot = MIMEMultipart("related")
    msgRoot["Subject"] = mail_subject
    msgRoot["From"] = strFrom
    msgRoot["To"] = strTo
    msgRoot.preamble = "This is a multi-part message in MIME format."
    msgAlternative = MIMEMultipart("alternative")
    msgRoot.attach(msgAlternative)
    msghtml = f'''
<!DOCTYPE html>
<html>
  <head>
    <title>User Verification of ILP Summer 2024 | SARC IIT Bombay</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; line-height: 1.5; background-color: #f8f8f8; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <h1 style="font-size: 24px; color: #333333; margin-top: 0; margin-bottom: 20px;">User Verification of ILP Summer 2024 | SARC IIT Bombay</h1>
        <p style="color: #555555; margin-bottom: 10px;">Dear User,</p>
        <p style="color: #555555; margin-bottom: 10px;">
          Thank you for signing up for the ILP. To complete your registration,
          please click the following link to verify your email address:
        </p>
        <p style="margin-bottom: 10px;">
          <a href="http://127.0.0.1:8000/api/authentication/verify-user/{token}" style="text-decoration: none; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
        </p>
      </div>
    </div>
  </body>
</html>
'''
    
    
    
    msgText = MIMEText(
        msghtml,
        "html",
    )

    msgAlternative.attach(msgText)
    smtp = smtplib.SMTP("smtp-auth.iitb.ac.in", 587)
    smtp.starttls()
    print(
        "everything is fine till now--------------------------------------------------"
    )
    # smtp.login("210010007@iitb.ac.in", "")

    try:
      smtp.login("sarc@iitb.ac.in", "87638c40a92a794bc81b6de03e5ae86c")
      response = smtp.sendmail(strFrom, strTo, msgRoot.as_string())
      print("Response is ", response)
      smtp.quit()
      return response
    except Exception as e:
      print(e.message, "this is eeeeeeeeeeeeeeeeeee")
      pass
  
  
from django.http import HttpResponse
import csv

def export_users_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="user_details.csv"'

    writer = csv.writer(response)
    writer.writerow(['User ID', 'Full Name', 'LDAP', 'Department', 'Degree', 'Program', 'Contact', 'Personal Email', 'LinkedIn', 'Resume Link', 'ASC SS Link', 'Projects', 'Internships', 'PORs'])

    queryset = queryset.order_by('id')

    for user in queryset:
        try:
            profile = Profile.objects.get(user=user)
        except:
            profile = None
        if(profile is not None):
            writer.writerow([user.id, user.fullname, user.ldap, user.dept, user.degree, user.program, user.contact, profile.personal_email, profile.linkedin, profile.resume_link, profile.asc_ss_link, profile.projects, profile.internships, profile.pors])
        else:
            writer.writerow([user.id, user.fullname, user.ldap, user.dept, user.degree, user.program, user.contact])

    return response
