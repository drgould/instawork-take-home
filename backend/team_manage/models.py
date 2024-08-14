from django.db import models

# Create your models here.


class TeamMember(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=256)
    phone = models.CharField(max_length=20)
    # boolean because there are only two roles currently
    # ideally if this app were using a more fully featured
    # database like postgres this would use an enum for the
    # automatic constraint but sqllite doesn't support enums
    is_admin = models.BooleanField()
