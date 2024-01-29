from django.urls import path
from .views import EventListCreateView, AdultEventListCreateView, KidsEventListCreateView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list'),
    path('adultevent/', AdultEventListCreateView.as_view(), name='adult-event-list'),
    path('kids-events/', KidsEventListCreateView.as_view(), name='kids-event-list'),
]