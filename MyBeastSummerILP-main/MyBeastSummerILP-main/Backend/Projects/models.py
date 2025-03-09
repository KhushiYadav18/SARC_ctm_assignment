from django.db import models

class Project(models.Model):
    company_name_designation = models.TextField(help_text='Name of the company and the designation of the person posting the project')
    project_title = models.TextField()
    problem_statement = models.TextField()
    type_of_project = models.TextField(help_text='Type of project (Internship/Project/Research)')
    departments_eligible = models.TextField(help_text='Departments eligible for the project')
    program_and_year = models.TextField(help_text='Program and Year of the students eligible for the project')
    prerequisites = models.TextField(help_text='Pre-requisites for the students')
    duration_weeks = models.TextField(help_text='Duration of the project in weeks')
    start_date = models.TextField(help_text='Tentative start date of the project')
    end_date = models.TextField(help_text='Tentative end date of the project')
    stipend_per_month = models.TextField(help_text='Stipend per month')
    city_of_posting = models.CharField(max_length=255)
    accommodation_provided = models.TextField(default=False)
    travel_expenses_covered = models.TextField(default=False, help_text="If the city of posting isn't Mumbai would traveling expenses be covered?")
    project_deliverables = models.TextField()
    major_takeaways = models.TextField(help_text='Major Takeaways for Students')
    company_name_use_permission = models.TextField(default=False, help_text='Can students use the name of your company & designation in their resumes after completing the project?')
    certificates_and_lors_provided = models.TextField(default=False, help_text='Will certificates and LoRs be provided to the students on successfully completing the project?')

    def __str__(self):
        return self.project_title
