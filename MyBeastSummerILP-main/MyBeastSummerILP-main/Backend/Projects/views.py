from django.shortcuts import render
import http.client
from .models import Project
import csv
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectSerializer
from Registrations.models import WishList
from Authentication.models import User
    
class ProjectListAPIView(APIView):
    def post(self, request, format=None, field=None):
        accessToken = request.data['accessToken']
        try:
            user = User.objects.get(accessToken=accessToken)
            if(user.is_active == False):
                return Response("User not verified", status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error while fetching user", e)
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(user)
        if(field is None):
            projects = Project.objects.all()
        else:
            try:
                projects = Project.objects.filter(pref=field)
            except Exception as e:
                print("Error while fetching Projects by field", field, e)
                return Response(status=status.HTTP_404_NOT_FOUND)
        

        
        wishlist_projects = WishList.objects.filter(user=user).values_list('projects', flat=True)
        
        serialized_projects = []
        for project in projects:
            serialized_project = ProjectSerializer(project).data
            serialized_project['wishlisted'] = project.pk in wishlist_projects
            serialized_projects.append(serialized_project)
        
        
        return Response(serialized_projects, status=status.HTTP_200_OK)


def add_projects_from_local_csv():
        try:
            csv_file_path = os.path.join(os.path.dirname(__file__), '../MentorData/data2.csv')
            
            # Read the local CSV file
            with open(csv_file_path, 'r') as file:
                csv_reader = csv.DictReader(file)
                
                # Loop through each row in the CSV file and create Mentor instances
                for row in csv_reader:
                    try:
                        project = Project(
                        project_name=row['project_name'],
                        project_desc=row['project_desc']
                        )
                        project.save()
                    except Exception as e:
                        print('Error saving project: ', row['project_name'], e)
                        pass
                
        except Exception as e:
            print('Failed to add data: ', e)

    


import csv
from django.http import HttpResponse
from django.shortcuts import render
from .models import Project
import os

def import_projects_from_csv():
        file_path = os.path.join(os.path.dirname(__file__), '../projectData/ilp2023.csv')
        
        

        with open(file_path, 'r', encoding='utf-8') as csv_file:
            reader = csv.DictReader(csv_file)

            for row in reader:
                project = Project(
                    preferred_dept=row['\ufeffdept'],
                    project_title=row['title'],
                    project_ps=row['ps'],
                    preferred_program=row['program'],
                    company_name=row['company'],
                    type_of_project=row['type'],
                    pre_reqs=row['pre'],
                    city=row['city'],
                    accomodation=row['accomodation'],
                    travelling_expenses=row['travel'],
                    stipend=row['stipend'],
                    duration=row['duration'],
                )
                project.save()

        print('done')
        


# class Project(models.Model):
#     company_name_designation = models.TextField(help_text='Name of the company and the designation of the person posting the project')
#     project_title = models.TextField()
#     problem_statement = models.TextField()
#     type_of_project = models.TextField(help_text='Type of project (Internship/Project/Research)')
#     departments_eligible = models.TextField(help_text='Departments eligible for the project')
#     program_and_year = models.TextField(help_text='Program and Year of the students eligible for the project')
#     prerequisites = models.TextField(help_text='Pre-requisites for the students')
#     duration_weeks = models.TextField(help_text='Duration of the project in weeks')
#     start_date = models.TextField(help_text='Tentative start date of the project')
#     end_date = models.TextField(help_text='Tentative end date of the project')
#     stipend_per_month = models.TextField(help_text='Stipend per month')
#     city_of_posting = models.CharField(max_length=255)
#     accommodation_provided = models.TextField(default=False)
#     travel_expenses_covered = models.TextField(default=False, help_text="If the city of posting isn't Mumbai would traveling expenses be covered?")
#     project_deliverables = models.TextField()
#     major_takeaways = models.TextField(help_text='Major Takeaways for Students')
#     company_name_use_permission = models.TextField(default=False, help_text='Can students use the name of your company & designation in their resumes after completing the project?')
#     certificates_and_lors_provided = models.TextField(default=False, help_text='Will certificates and LoRs be provided to the students on successfully completing the project?')


def export_projects_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="user_details.csv"'

    writer = csv.writer(response)
    writer.writerow(['Project ID', 'Project Title', 'Problem Statement', 'Preferred Department', 'Preferred Program', 'Company Name', 'Type of Project', 'Pre-requisites', 'City', 'Accomodation', 'Travelling Expenses', 'Stipend', 'Duration'])

    for project in queryset:
        writer.writerow([project.pk, project.project_title, project.problem_statement, project.departments_eligible, project.program_and_year, project.company_name_designation, project.type_of_project, project.prerequisites, project.city_of_posting, project.accommodation_provided, project.travel_expenses_covered, project.stipend_per_month, project.duration_weeks])

    return response