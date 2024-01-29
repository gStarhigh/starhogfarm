from django.contrib import admin
from .models import Event


class EventAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'full_name', 'phone_number', 'email',
                    'competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid', 'created_at', 'updated_at')


admin.site.register(Event, EventAdmin)