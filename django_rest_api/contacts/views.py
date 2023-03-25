

# Create your views here.
from rest_framework import generics
from .serializers import ContactSerializer
from .models import Contact

class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all().order_by('id')     # what are we retrieving? -- retrieve all objects from the DB, order by id ascending
    serializer_class = ContactSerializer    # tell django what serializer to use

class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all().order_by('id') # this is not a typo...these two are exactly alike but DRF requires it 
    serializer_class = ContactSerializer
