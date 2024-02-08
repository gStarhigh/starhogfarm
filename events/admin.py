from django.contrib import admin
from .models import Event, AdultEvent, KidsEvent


class EventAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'full_name', 'phone_number', 'email',
                    'competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid', 'event_type', 'created_at', 'updated_at', )
    
    list_filter = ('competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid', 'event_type') # Removed 'wants_box_spot'
    
admin.site.register(Event, EventAdmin)
admin.site.register(AdultEvent)
admin.site.register(KidsEvent)
