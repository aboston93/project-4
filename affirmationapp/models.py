from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)



class TaskItem(models.Model):
    # add the different fields of our model
    # see https://docs.djangoproject.com/en/2.2/ref/models/fields/ for the 
    # different kinds of fields you can use
     description = models.CharField(max_length=3000)
     status = models.CharField(max_length=3000)
     CreatedOn = models.DateTimeField(auto_now=True)
     user = models.ForeignKey(User,on_delete=models.CASCADE,default=1,related_name="task_users")



class Media(models.Model):
     description = models.CharField(max_length=1000)
     status = models.BooleanField()
     url = models.CharField(max_length=300)
     
    