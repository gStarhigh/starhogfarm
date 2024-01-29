from rest_framework import generics, status
from rest_framework.response import Response
from .models import Event, AdultEvent, KidsEvent
from .serializers import EventSerializer, AdultEventSerializer, KidsEventSerializer

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class AdultEventListCreateView(generics.ListCreateAPIView):
    queryset = AdultEvent.objects.all()
    serializer_class = AdultEventSerializer

    def get_queryset(self):
        return AdultEvent.objects.all()
    
    def perform_create(self, serializer):
        serializer.save()

    
class KidsEventListCreateView(generics.ListCreateAPIView):
    queryset = KidsEvent.objects.all()
    serializer_class = KidsEventSerializer