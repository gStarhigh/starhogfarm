from django.urls import path
from .views import EventListCreateView, AdultEventListCreateView, KidsEventListCreateView, AvailableSpotsView, KidsAvailableSpotsView, BookingListView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list'),
    path('adultevent/', AdultEventListCreateView.as_view(), name='adult-event-list'),
    path('available_spots_adult/', AvailableSpotsView.as_view(), name='available-spots-adult'),
    path('kidsevent/', KidsEventListCreateView.as_view(), name='kids-event-list'),
    path('available_spots_kids/', KidsAvailableSpotsView.as_view(), name='available-spots-kids'),
    path('bookings/', BookingListView.as_view(), name='booking-list'),
]