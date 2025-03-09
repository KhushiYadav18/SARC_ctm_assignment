import csv
from django.core.management.base import BaseCommand
from Projects.models import Project

class Command(BaseCommand):
    help = 'Import projects from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file_path', type=str, help='The CSV file path')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file_path']
        with open(csv_file_path, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Project.objects.create(
                    company_name_designation=row['Company Name and Designation'].split(',', 1)[0].strip(),
                    project_title=row['Project Title'],
                    problem_statement=row['Problem Statement'],
                    type_of_project=row['Type of Project'],
                    departments_eligible=row['Departments eligible for the project'],
                    program_and_year=row['Program (UG/ PG) and year of study of student'],
                    prerequisites=row['Pre-requisites for the students'],
                    duration_weeks=(row['Duration of project (in weeks)']),
                    start_date=row['Tentative start and end dates of the project'],
                    end_date=row['Tentative start and end dates of the project'],
                    stipend_per_month=row['Stipend for the Project (per student per month)'],
                    city_of_posting=row['What will be the city of posting?'],
                    accommodation_provided=row['Will accommodation be provided?'],
                    travel_expenses_covered=row['If the city of posting isn\'t Mumbai would traveling expenses be covered?'],
                    project_deliverables=row['Project Deliverables'],
                    major_takeaways=row['Major Takeaways for Students'],
                    company_name_use_permission=row['Can students use the name of your company & designation in their resumes after completing the project?'],
                    certificates_and_lors_provided=row['Will certificates and LoRs be provided to the students on successfully completing the project?'],
                )
                self.stdout.write(self.style.SUCCESS(f"Successfully imported project titled '{row['Project Title']}'"))
