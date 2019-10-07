from rest_framework import serializers    
from .models import TaskItem,User,Media
     
class TaskItemSerializer(serializers.ModelSerializer):  
    class Meta:
        model = TaskItem
        fields = ['id', 'description', 'status','CreatedOn','user']


class UserSerializer(serializers.ModelSerializer):  
    class Meta:     
        model = User    
        fields = ['id','email','username']

class MediaSerializer(serializers.ModelSerializer):  
    class Meta:     
        model = Media    
  
        fields = ['id','email','url','status', 'description','taskitem']