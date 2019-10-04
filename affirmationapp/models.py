from django.db import models


class User(models.Model):
    username = models.CharField(max_length=30)
    email = models.CharField(max_length=30)



class Goals(models.Model):
    # add the different fields of our model
    # see https://docs.djangoproject.com/en/2.2/ref/models/fields/ for the 
    # different kinds of fields you can use
     description = models.CharField(max_length=30)
     status = models.BooleanField()
     CreatedOn = models.DateTimeField(auto_now=True)
     user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="users")

