from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from .serializers import ContestSerializer
from .models import Contest
from django.utils import timezone
from django.db.models import Q


class ContestListView(ListAPIView):
    queryset = Contest.objects.prefetch_related('registrations').all()
    serializer_class = ContestSerializer
    permission_classes=(IsAuthenticated,)
    authentication_classes=(SessionAuthentication, TokenAuthentication)

    def list(self, request):
        query_set = self.get_queryset()
        past_contests = Contest.get_past_contests_in_queryset(query_set)
        ongoing_contests = Contest.get_ongoing_contests_in_queryset(query_set)
        upcoming_contests = Contest.get_upcoming_contests_in_queryset(query_set)

        context = { 'request': request, 'fields_to_hide': 'registrations' }

        response_data = {
            'past': {
                'content': ContestSerializer(past_contests, many=True, context=context).data,
                'count': past_contests.count()
            },
            'ongoing': {
                'content': ContestSerializer(ongoing_contests, many=True, context=context).data,
                'count': ongoing_contests.count()
            },
            'upcoming': {
                'content': ContestSerializer(upcoming_contests, many=True, context=context).data,
                'count': upcoming_contests.count()
            }
        }

        return Response(response_data, status=HTTP_200_OK)


class ContestRUDView(RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer
    permission_classes=(IsAuthenticated,)
    authentication_classes=(SessionAuthentication,)


class OngoingContestsRetrieveView(APIView):
    
    def get(self, *args, **kwargs):
        now = timezone.now()
        ongoing_contests = Contest.objects.filter(Q(start_time__lte=now), Q(end_time__gte=now))
        serialized_data = ContestSerializer(ongoing_contests, many=True)

        return Response(serialized_data.data)