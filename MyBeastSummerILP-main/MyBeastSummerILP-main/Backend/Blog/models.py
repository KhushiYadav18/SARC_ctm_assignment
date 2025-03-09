from django.db import models
from Projects.models import Project
from Authentication.models import User

# Create your models here.


class Blog(models.Model):
    title = models.TextField(blank=True)
    current_date_time = models.DateTimeField(auto_now_add=True)
    is_interview_schedule = models.BooleanField(default=False)
    interview_date = models.TextField(blank=True)
    interview_project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, null=True)
    interview_schedule_or_shortlisted_students_or_final_students = models.ManyToManyField(User, blank=True)
    interview_mode = models.TextField(blank=True)
    interview_times = models.TextField(blank=True)
    is_interview_shortlist = models.BooleanField(default=False)
    is_final_selections = models.BooleanField(default=False)
    content = models.TextField(blank=True)

    def __str__(self):
        if self.title:
            return self.title
        else:
            if self.is_interview_schedule:
                return "Interview Schedule "+"Project ID: " + str(self.interview_project.id)
            elif self.is_interview_shortlist:
                return "Interview Shortlist "+"Project ID: " + str(self.interview_project.id)
            elif self.is_final_selections:
                return "Final Selections "+"Project ID: " + str(self.interview_project.id)