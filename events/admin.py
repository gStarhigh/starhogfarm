from django.contrib import admin
from .models import Event


class EventAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'full_name', 'phone_number', 'email',
                    'competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid', 'created_at', 'updated_at',)
    
    list_filter = ('competition_level', 'agreement_accepted', 'deposit_paid',
                    'full_payment_paid')
# Måste lösa så att varje bokning blir märkt med till vilket event det är gjort.
# måste ta bort email- unique i modellen.

admin.site.register(Event, EventAdmin)