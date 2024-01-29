from rest_framework import serializers
from .models import Event, AdultEvent, KidsEvent

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['booking_id', 'full_name', 'phone_number', 'email', 'competition_level', 'agreement_accepted', 'deposit_paid', 'full_payment_paid', 'created_at', 'updated_at']

class AdultEventSerializer(EventSerializer):
    class Meta(EventSerializer.Meta):
        model = AdultEvent
        fields = EventSerializer.Meta.fields + ['total_spots', 'booked_spots', 'reserved_spots', 'additional_info']

class KidsEventSerializer(EventSerializer):
    class Meta(EventSerializer.Meta):
        model = KidsEvent
        fields = EventSerializer.Meta.fields + ['total_spots', 'booked_spots', 'reserved_spots', 'additional_info']