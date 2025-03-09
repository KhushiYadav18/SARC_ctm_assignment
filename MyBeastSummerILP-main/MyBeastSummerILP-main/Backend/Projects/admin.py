from django.contrib import admin
from .models import Project
from .views import export_projects_to_csv

export_projects_to_csv.short_description = "Export selected projects to CSV"

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    search_fields = ('ldap', 'fullname')
    actions = [export_projects_to_csv]