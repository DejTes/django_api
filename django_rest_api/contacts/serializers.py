from rest_framework import serializers # use rest_framework's serializer
from .models import Contact # import our Contact model

class ContactSerializer(serializers.ModelSerializer):    # ModelSerializer is a method inside of serializer
    class Meta:
        model = Contact   # tell django which model to use
        fields = ('id', 'name', 'age',)    # tell django which fields to send out
