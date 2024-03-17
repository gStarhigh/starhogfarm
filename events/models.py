from django.db import models
from django.core.exceptions import ValidationError
import uuid

# Bokningsstatus för lektionen
BOOKING_STATUS = ((0, "Obekräftad"), (1, "Bekräftad"))

class Event(models.Model):
    booking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) # Unik ID för varje bokning
    full_name = models.CharField(max_length=100) # Fullständigt namn på deltagaren
    phone_number = models.CharField(max_length=15) # Telefonnummer till deltagaren
    email = models.EmailField() # E-postadress till deltagaren
    agreement_accepted = models.BooleanField(default=False) # Indikerar om avtalet har lästs och accepterats
    deposit_paid = models.BooleanField(default=False) # Indikerar om insättningen har betalats
    full_payment_paid = models.BooleanField(default=False) # Indikerar om hela betalningen har betalats
    created_at = models.DateTimeField(auto_now_add=True) # Tidsstämpel när registreringen skapades
    updated_at = models.DateTimeField(auto_now=True) # Tidsstämpel när registreringen senast uppdaterades
    booking_status = models.IntegerField(choices=BOOKING_STATUS, default=0) # Status för bokningen
    LEVEL_CHOICES = (
        ("Lätt C", "Lätt C"),
        ("Lätt B", "Lätt B"),
        ("Lätt A", "Lätt A"),
        ("MSV C", "MSV C"),
        ("MSV B", "MSV B"),
        ("MSV A", "MSV A"),
        ("Grand Prix", "Grand Prix"),
    )
    competition_level = models.CharField(max_length=20, choices=LEVEL_CHOICES) # Tävlingsnivå för laget
    event_type = models.CharField(max_length=20) # Typ av evenemang: AdultEvent eller KidsEvent
    
    def save(self, *args, **kwargs):
        """
        Överskrider spara-metoden för att utföra anpassade åtgärder innan sparande.
        """
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """
        Överskrider ta bort-metoden för att utföra anpassade åtgärder innan borttagning.
        """
        # Utför eventuella nödvändiga åtgärder här
        super().delete(*args, **kwargs)


class AdultEvent(Event):
    booked_spots = models.PositiveIntegerField(default=0) # Antal platser som har bokats
    horse_box_spots = models.PositiveIntegerField(default=5) # Max antal hästboxplatser
    additional_info = models.TextField(blank=True, null=True) # Ytterligare information
    wants_box_spot = models.PositiveIntegerField(default=0) # Antal box platser som har bokats
    
    def available_box_spots(self):
        """
        Beräknar antalet tillgängliga hästboxplatser för vuxenevenemanget.
        """
        total_horse_box_spots = self.horse_box_spots
        used_horse_box_spots = self.wants_box_spot
        available_spots_adult = total_horse_box_spots - used_horse_box_spots
        return max(0, available_spots_adult)
    
    def save(self, *args, **kwargs):
        self.event_type = 'AdultEvent'
        super().save(*args, **kwargs)


class KidsEvent(Event):
    booked_spots = models.PositiveIntegerField(default=0) # Antal platser som har bokats
    horse_box_spots = models.PositiveIntegerField(default=5) # Max antal hästboxplatser
    additional_info = models.TextField(blank=True, null=True) # Ytterligare information
    wants_box_spot = models.PositiveIntegerField(default=0) # Antal box platser som har bokats
    
    def available_box_spots(self):
        """
        Beräknar antalet tillgängliga hästboxplatser för barnen evenemanget.
        """
        total_horse_box_spots = self.horse_box_spots
        used_horse_box_spots = self.wants_box_spot
        available_spots_kids = total_horse_box_spots - used_horse_box_spots
        return max(0, available_spots_kids)
    
    def save(self, *args, **kwargs):
        self.event_type = 'KidsEvent'
        super().save(*args, **kwargs)
