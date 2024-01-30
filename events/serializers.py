from rest_framework import serializers
from .models import Event, AdultEvent, KidsEvent

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['booking_id', 'full_name', 'phone_number', 'email', 'competition_level', 'agreement_accepted', 'deposit_paid', 'full_payment_paid', 'created_at', 'updated_at']

class AdultEventSerializer(EventSerializer):
    available_box_spots = serializers.SerializerMethodField()

    class Meta(EventSerializer.Meta):
        model = AdultEvent
        fields = EventSerializer.Meta.fields + ['booked_spots', 'horse_box_spots', 'additional_info', 'available_box_spots']

    def get_available_box_spots(self, obj):
        return obj.available_box_spots()

class KidsEventSerializer(EventSerializer):
    available_box_spots = serializers.SerializerMethodField()

    class Meta(EventSerializer.Meta):
        model = KidsEvent
        fields = EventSerializer.Meta.fields + ['booked_spots', 'horse_box_spots', 'additional_info', 'available_box_spots']

    def get_available_box_spots(self, obj):
        return obj.available_box_spots()