from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from .serializers import ContestSerializer
from .models import Contest
from django.utils import timezone
from django.db.models import Q
from rest_framework.response import Response


class ContestRUDView(RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer


class OngoingContestsRetrieveView(APIView):
    
    def get(self, *args, **kwargs):
        now = timezone.now()
        ongoing_contests = Contest.objects.filter(Q(start_time__lte=now), Q(end_time__gte=now))
        serialized_data = ContestSerializer(ongoing_contests, many=True)

        return Response(serialized_data.data)