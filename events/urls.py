from django.urls import path
from .views import EventListCreateView, AdultEventListCreateView, KidsEventListCreateView, AvailableSpotsView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list'),
    path('adultevent/', AdultEventListCreateView.as_view(), name='adult-event-list'),
    path('available_spots/', AvailableSpotsView.as_view(), name='available-spots'),
    path('kids-events/', KidsEventListCreateView.as_view(), name='kids-event-list'),
]