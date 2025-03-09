from django.db import models
from Authentication.models import User
from Projects.models import Project

# Create your models here.
class Registration(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pref1 = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='pref1', blank=True, null=True)
    pref2 = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='pref2', blank=True, null=True)
    pref3 = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='pref3',  blank=True, null=True)
    pref4 = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='pref4', blank=True, null=True)
    pref5 = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='pref5', blank=True, null=True)
    
    def __str__(self):
        return self.user.ldap+" "+self.pref1.project_title

class WishList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    projects = models.ManyToManyField(Project, related_name='wishlist', max_length=15)
    
    def __str__(self):
        return self.user.ldap+" "+self.user.fullname