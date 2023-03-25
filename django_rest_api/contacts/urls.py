from django.urls import path
from . import views

urlpatterns = [
    path('contacts', views.ContactList.as_view(), name='contact_list'),       # contacts will be routed to the ContactList view for handling
    path('contacts/<int:pk>', views.ContactDetail.as_view(), name='contact_detail'),     # contacts/<int:pk> will be routed to the ContactDetail view for handling
]
