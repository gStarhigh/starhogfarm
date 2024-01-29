from django.db import models
from django.core.exceptions import ValidationError
import uuid

# Booking status of the Lesson
BOOKING_STATUS = ((0, "Obekräftad"), (1, "Bekräftad"), (2, "Reserv"))

class Event(models.Model):
    booking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) # Unique ID for each booking
    full_name = models.CharField(max_length=100) # Full name of the participant
    phone_number = models.CharField(max_length=15) # Phone number of the participant
    email = models.EmailField(unique=True) # Email address of the participant
    agreement_accepted = models.BooleanField(default=False) # Indicates whether the agreement has been read and accepted
    deposit_paid = models.BooleanField(default=False) # Indicates whether the deposit has been paid
    full_payment_paid = models.BooleanField(default=False) # Indicates whether the full payment has been paid
    created_at = models.DateTimeField(auto_now_add=True) # Timestamp when the registration was created
    updated_at = models.DateTimeField(auto_now=True) # Timestamp when the registration was last updated
    booking_status = models.IntegerField(choices=BOOKING_STATUS, default=0)
    LEVEL_CHOICES = (
        ("Lätt C", "Lätt C"),
        ("Lätt B", "Lätt B"),
        ("Lätt A", "Lätt A"),
        ("MSV C", "MSV C"),
        ("MSV B", "MSV B"),
        ("MSV A", "MSV A"),
        ("Grand Prix", "Grand Prix"),
    )
    competition_level = models.CharField(max_length=20, choices=LEVEL_CHOICES) # Competition level of the team
    
    
    def clean(self):
        """
        Check that the total number of spots is greater than the number of reserved spots.
        """
        if self.total_spots < self.reserved_spots:
            raise ValidationError("Number of reserved spots cannot exceed total capacity.")

    def save(self, *args, **kwargs):
        """
        Override the save method to call the clean method before saving.
        """
        self.full_clean()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """
        Override the delete method to perform custom actions before deletion.
        """
        # Perform any necessary actions here
        super().delete(*args, **kwargs)


class AdultEvent(Event):
    total_spots = models.PositiveIntegerField(default=6) # Total number of available spots
    booked_spots = models.PositiveIntegerField(default=0) # Number of spots that have been booked
    reserved_spots = models.PositiveIntegerField(default=0) # Number of reserved spots
    additional_info = models.TextField(blank=True, null=True)
    
class KidsEvent(Event):
    total_spots = models.PositiveIntegerField(default=6) # Total number of available spots
    booked_spots = models.PositiveIntegerField(default=0) # Number of spots that have been booked
    reserved_spots = models.PositiveIntegerField(default=0) # Number of reserved spots
    additional_info = models.TextField(blank=True, null=True)