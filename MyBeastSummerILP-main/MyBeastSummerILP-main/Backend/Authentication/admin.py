from django.contrib import admin
from .models import User, Profile, Token
from .views import export_users_to_csv


export_users_to_csv.short_description = "Export selected users to CSV"

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    search_fields = ('ldap', 'fullname')
    actions = [export_users_to_csv]


admin.site.register(Profile)
admin.site.register(Token)