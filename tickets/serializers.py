from rest_framework import serializers
from .models import Tickets


class TicketsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Tickets
        fields = ['owner', 'created_on', 'updated_on', 'subject',
                  'message', 'ticket_status', 'is_owner', 'id',]
