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
        try:
            # Försök hämta det första AdultEvent-objektet
            adult_event = AdultEvent.objects.first()
            if adult_event is None:
                total_horse_box_spots = 5
            else:
                total_horse_box_spots = adult_event.horse_box_spots

            # Hämta antalet bokningar, om det inte finns några bokningar sätt till 0
            num_bookings = AdultEvent.objects.aggregate(total_bookings=Sum('wants_box_spot'))['total_bookings'] or 0

            # Beräkna antalet tillgängliga platser
            available_spots = max(0, total_horse_box_spots - num_bookings)

            return Response({"available_spots": available_spots})
        except Exception as e:
            # Hantera eventuella fel som uppstår under beräkningen
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




    
class KidsEventListCreateView(generics.ListCreateAPIView):
    queryset = KidsEvent.objects.all()
    serializer_class = KidsEventSerializer