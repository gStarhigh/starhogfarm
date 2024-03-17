from django.contrib import admin
from .models import Event, AdultEvent, KidsEvent

class EventAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'full_name', 'phone_number', 'email',
                    'competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid', 'event_type', 'created_at', 'updated_at', )
    
    list_filter = ('competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid', 'event_type')
    
admin.site.register(Event, EventAdmin)

class AdultEventAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'full_name', 'phone_number', 'email',
                    'competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid', 'wants_box_spot', 'created_at', 'updated_at', )
    
    list_filter = ('competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid',)
    
admin.site.register(AdultEvent, AdultEventAdmin)

class KidsEventAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'full_name', 'phone_number', 'email',
                    'competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid', 'wants_box_spot', 'created_at', 'updated_at', )
    
    list_filter = ('competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid',)
    
admin.site.register(KidsEvent, KidsEventAdmin)
