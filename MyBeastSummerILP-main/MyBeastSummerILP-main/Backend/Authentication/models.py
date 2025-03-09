import uuid
from django.db import models
from Projects.options import BRANCH_CHOICES, DEGREE_CHOICES, PROGRAM_CHOICES

class User(models.Model):
    fullname = models.CharField(max_length=100)
    ldap = models.EmailField(max_length=100, unique=True)
    dept = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    program = models.CharField(max_length=100)
    contact = models.CharField(max_length=10)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    accessToken = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.fullname + " " + self.ldap

    def save(self, *args, **kwargs):
        if not self.accessToken: 
            self.accessToken = uuid.uuid4()
        super(User, self).save(*args, **kwargs) 

class Token(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.fullname + " " + str(self.token)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    personal_email = models.EmailField(max_length=200)
    linkedin = models.CharField(max_length=200)
    resume_link = models.CharField(max_length=500)
    asc_ss_link = models.CharField(max_length=500)
    projects = models.CharField(max_length=5000)
    internships = models.CharField(max_length=5000)
    pors = models.CharField(max_length=5000)

    def __str__(self):
        return self.user.fullname + " " + self.user.ldap