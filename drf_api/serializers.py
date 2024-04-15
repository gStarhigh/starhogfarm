from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from django.contrib.auth.models import User


class CurrentUserSerializer(UserDetailsSerializer):
    profile_id = serializers.ReadOnlyField(source='profile.id')
    is_staff = serializers.ReadOnlyField()
    is_superuser = serializers.ReadOnlyField()
    

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'profile_id', 'is_staff', 'is_superuser'
        )
