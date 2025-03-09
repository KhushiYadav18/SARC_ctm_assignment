from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegistrationSerializer, WishListSerializer
from Authentication.models import User, Profile
from .models import Registration, WishList
from Projects.serializers import ProjectSerializer
from Projects.models import Project
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import smtplib
import os


class RegistrationAPIView(APIView):
    def post(self, request):
        accessToken = request.data['accessToken']
        try:
            user = User.objects.get(accessToken=accessToken)
            if(user.is_active == False):
                return Response("User not verified", status=status.HTTP_400_BAD_REQUEST)
            if(not Profile.objects.filter(user=user)[0]):
                return Response("Profile Not Found", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("Error while fetching user", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(user)
        request.data['user'] = user.id
        
        if(Registration.objects.filter(user=user)):
            return Response("Registration already exists", status=status.HTTP_400_BAD_REQUEST)
            
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
            except Exception as e:
                print( e)
                return Response("Something went wrong", status=status.HTTP_406_NOT_ACCEPTABLE)
            send_sso_mail(emailid=user.ldap)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


class WishListAPIView(APIView):
    def post(self, request):
        accessToken = request.data['accessToken']
        try:
            user = User.objects.get(accessToken=accessToken)
            if(user.is_active == False):
                return Response("User not verified", status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error while verifying user", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(user)
        try:
            if(not WishList.objects.filter(user=user)[0]):
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            wishlist = WishList.objects.get(user=user)
            if(not wishlist.projects.filter(id=request.data['mentor'])):
                return Response("Mentor not in the wishlist", status=status.HTTP_404_NOT_FOUND)
            wishlist.projects.remove(request.data['mentor'])
            wishlist.save()
            return Response("Mentor deleted to wishlist", status=status.HTTP_200_OK)
        except Exception as e:
            print("Error while updating wishlist", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    
    def get(self, request):
        try:
            accessToken = request.query_params.get('accessToken')
            user = User.objects.get(accessToken=accessToken)
            
            if not user.is_active:
                return Response("User not verified", status=status.HTTP_400_BAD_REQUEST)
            
            wishlist = WishList.objects.get(user=user)
            projects = []

            for mentor in wishlist.projects.all():
                serializer = ProjectSerializer(mentor)
                mentor_data = serializer.data;
                mentor_data['wishlisted'] = True
                projects.append(mentor_data)
                
            
            return Response(projects, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        except WishList.DoesNotExist:
            return Response("Wishlist not found", status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print("Error while fetching wishlist", e)
            return Response("Internal server error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    def put(self, request):
        accessToken = request.data['accessToken']
        try:
            user = User.objects.get(accessToken=accessToken)
            if(user.is_active == False):
                return Response("User not verified", status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error while verifying user", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(user)
        try:
            if(not WishList.objects.filter(user=user)):
                wishlist = WishList.objects.create(user=user)
            wishlist = WishList.objects.get(user=user)
            if(wishlist.projects.filter(id=request.data['mentor'])):
                return Response("Mentor already in wishlist", status=status.HTTP_400_BAD_REQUEST)
            wishlist.projects.add(request.data['mentor'])
            wishlist.save()
            return Response("Mentor added to wishlist", status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Error while updating wishlist", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        


import csv
from django.http import HttpResponse
from .models import Registration

def export_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="registration_data.csv"'

    writer = csv.writer(response)
    writer.writerow(['full name', 'contact', 'Email', 'sop', 'Personal email', 'linkedin', 'Pref1 ID', 'Pref1 Name', 'Pref2 ID', 'Pref2 Name', 'Pref3 ID', 'Pref3 Name', 'Pref4 ID', 'Pref4 Name', 'Pref5 ID', 'Pref5 Name'])

    registrations = Registration.objects.select_related('user', 'pref1', 'pref2', 'pref3', 'pref4', 'pref5').all()

    for registration in registrations:
        profile = Profile.objects.filter(user=registration.user)[0]
        writer.writerow([
            registration.user.fullname,
            registration.user.contact,
            registration.user.ldap,
            profile.sop,
            profile.personal_email,
            profile.linkedin,
            registration.pref1.id,
            registration.pref1.fullname,
            registration.pref2.id,
            registration.pref2.fullname,
            registration.pref3.id,
            registration.pref3.fullname,
            registration.pref4.id,
            registration.pref4.fullname,
            registration.pref5.id,
            registration.pref5.fullname,
        ])

    return response




def export_csv_wishlist(request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="wishlist_data.csv"'

    writer = csv.writer(response)
    writer.writerow(['fullname', 'context', 'email', 'Mentor IDs', 'Mentor Names'])

    for wishlist in WishList.objects.all():
        projects_ids = [str(mentor.id) for mentor in wishlist.projects.all()]
        projects_names = [mentor.fullname for mentor in wishlist.projects.all()]

        writer.writerow([
            wishlist.user.fullname,
            wishlist.user.contact,
            wishlist.user.ldap,
            ', '.join(projects_ids),
            ', '.join(projects_names),
        ])

    return response

def export_registrations_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="registrations_details.csv"'

    writer = csv.writer(response)
    writer.writerow(['Project ID', 'Project Title', 'User IDs Pref 1', 'User IDs Pref 2', 'User IDs Pref 3', 'User IDs Pref 4', 'User IDs Pref 5'])
    
    projects = Project.objects.all()
    

    for project in projects:
        
        registration1 = Registration.objects.filter(pref1=project)
        registration2 = Registration.objects.filter(pref2=project)
        registration3 = Registration.objects.filter(pref3=project)
        registration4 = Registration.objects.filter(pref4=project)
        registration5 = Registration.objects.filter(pref5=project)
        
        users1 = []
        users2 = []
        users3 = []
        users4 = []
        users5 = []
        
        
        for reg in registration1:
            users1.append(reg.user)
        
        for user in users1:
            if user.id == 1:
                users1.insert(0, users1.pop(users1.index(user)))
        
        for reg in registration2:
            users2.append(reg.user)
        
        for user in users2:
            if user.id == 1:
                users2.insert(0, users2.pop(users2.index(user)))
        
        for reg in registration3:
            users3.append(reg.user)
            
        for user in users3:
            if user.id == 1:
                users3.insert(0, users3.pop(users3.index(user)))
        
        for reg in registration4:
            users4.append(reg.user)
            
        for user in users4:
            if user.id == 1:
                users4.insert(0, users4.pop(users4.index(user)))
        
        for reg in registration5:
            users5.append(reg.user)
            
        for user in users5:
            if user.id == 1:
                users5.insert(0, users5.pop(users5.index(user)))
        
        
        writer.writerow([project.id, project.project_title, ', '.join([str(user.id) for user in users1]), ', '.join([str(user.id) for user in users2]), ', '.join([str(user.id) for user in users3]), ', '.join([str(user.id) for user in users4]), ', '.join([str(user.id) for user in users5])])

    return response




def send_sso_mail(
    mail_subject="Regarding Successful ILP Registration | SARC IIT Bombay",
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
    <title>Regarding Successful ILP Registration | SARC IIT Bombay</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; line-height: 1.5; background-color: #f8f8f8; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <h1 style="font-size: 24px; color: #333333; margin-top: 0; margin-bottom: 20px;">Regarding Successful ILP Registration</h1>
        <p style="color: #555555; margin-bottom: 10px;">Dear Student,</p>
        <p style="color: #555555; margin-bottom: 10px;">
          Your registration for the Industrial Learning Program(ILP) Summer 2024 is successful. We wish you all the best for the selection process. In case you are shortlisted for any project, the next steps for the shortlisting process would be displayed on the ILP Blog, so make sure to keep track of it.
        </p>
        <p style="color: #555555; margin-bottom: 10px;">
        Thanks and Regards,
        <br>
        SARC IIT Bombay
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