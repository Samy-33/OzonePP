from rest_framework import serializers
from .models import Contest, ContestRegistration, ContestAnnouncement
from utils.serializer_utils import DynamicFieldModelSerializer

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestRegistration
        exclude = ['added_ts']


class ContestSerializer(DynamicFieldModelSerializer):

    registrations = RegistrationSerializer(many=True, read_only=True)
    is_registered = serializers.SerializerMethodField()

    class Meta:
        model = Contest
        exclude = ['added_ts']

    def get_is_registered(self, instance):
        request = self.context.get('request')

        if request and request.user:
            return instance.registrations.filter(user=request.user).exists()
        
        return False


class ContestAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestAnnouncement
        fields = '__all__'