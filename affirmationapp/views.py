from rest_framework import viewsets    
from .serializers import MediaSerializer,UserSerializer,TaskItemSerializer  
from .models import TaskItem,User,Media         
                                                                    
    
class MediaViewSet(viewsets.ModelViewSet):    
    """    
    API endpoint that allows users to be viewed or edited.    
    """    
    queryset = Media.objects.all()    
    serializer_class = MediaSerializer


class UserViewSet(viewsets.ModelViewSet):    
    """    
    API endpoint that allows users to be viewed or edited.    
    """    
    queryset = User.objects.all()    
    serializer_class = UserSerializer


class TaskItemViewSet(viewsets.ModelViewSet):    
    """    
    API endpoint that allows users to be viewed or edited.    
    """    
    queryset = TaskItem.objects.all()    
    serializer_class = TaskItemSerializer


# Create your views here.
