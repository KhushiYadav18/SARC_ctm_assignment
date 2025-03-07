import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    email_verification_token = models.CharField(
        max_length=255,
        unique=True,
        blank=True,
        null=True
    )

    def save(self, *args, **kwargs):
        if not self.email_verification_token:  # Only generate if it's not set
            self.email_verification_token = str(uuid.uuid4())
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
