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
        

class KidsEventListCreateView(generics.ListCreateAPIView):
    queryset = KidsEvent.objects.all()
    serializer_class = KidsEventSerializer
    
    def get_queryset(self):
        return KidsEvent.objects.all()
    
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
            available_spots_adult = max(0, total_horse_box_spots - num_bookings)

            return Response({"available_spots_adult": available_spots_adult})
        except Exception as e:
            # Hantera eventuella fel som uppstår under beräkningen
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class KidsAvailableSpotsView(APIView):
    def get(self, request):
        try:
            # Försök hämta det första KidsEvent-objektet
            kids_event = KidsEvent.objects.first()
            if kids_event is None:
                total_horse_box_spots = 5
            else:
                total_horse_box_spots = kids_event.horse_box_spots
            
            # Hämta antalet bokningar, om det inte finns några bokningar sätt till 0
            num_bookings = KidsEvent.objects.aggregate(total_bookings=Sum('wants_box_spot'))['total_bookings'] or 0

            # Beräkna antalet tillgängliga platser
            available_spots_kids = max(0, total_horse_box_spots - num_bookings)


            return Response({"available_spots_kids": available_spots_kids})
        except Exception as e:
            # Hantera eventuella fel som uppstår under beräkningen
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BookingListView(APIView):
    def get(self, request):
        adult_events = AdultEvent.objects.all()
        kids_events = KidsEvent.objects.all()

        adult_bookings = []
        kids_bookings = []

        for event in adult_events:
            serializer = AdultEventSerializer(event)
            adult_bookings.append(serializer.data)

        for event in kids_events:
            serializer = KidsEventSerializer(event)
            kids_bookings.append(serializer.data)

        return Response({"adult_events": adult_bookings, "kids_events": kids_bookings})