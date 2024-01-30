from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Event, AdultEvent, KidsEvent
from django.db.models import Sum
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
        
class AvailableSpotsView(APIView):
    def get(self, request):
        # Hämta antalet bokningar för vuxenevenemang
        num_bookings = AdultEvent.objects.aggregate(total_bookings=Sum('booked_spots'))['total_bookings']
        if num_bookings is None:
            num_bookings = 0

        # Hämta totalt antal hästboxplatser för vuxenevenemang
        total_horse_box_spots = AdultEvent.objects.first().horse_box_spots

        # Beräkna antalet tillgängliga platser genom att subtrahera antalet bokningar från det totala antalet platser
        available_spots = max(0, total_horse_box_spots - num_bookings)

        return Response({"available_spots": available_spots})


    
class KidsEventListCreateView(generics.ListCreateAPIView):
    queryset = KidsEvent.objects.all()
    serializer_class = KidsEventSerializer