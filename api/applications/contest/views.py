from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from knox.auth import TokenAuthentication
from .serializers import ContestSerializer, RegistrationSerializer, ContestAnnouncementSerializer
from .models import Contest, ContestRegistration, ContestAnnouncement
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.db.models import Q


class ContestListView(ListAPIView):
    queryset = Contest.objects.prefetch_related('registrations').all()
    serializer_class = ContestSerializer
    permission_classes=(IsAuthenticated,)
    authentication_classes=(TokenAuthentication,)

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
    lookup_field = 'code'
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer
    permission_classes=(IsAuthenticated,)
    authentication_classes=(SessionAuthentication, TokenAuthentication)


class ContestAnnouncementListView(ListAPIView):
    serializer_class = ContestAnnouncementSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes=(SessionAuthentication, TokenAuthentication)

    def get_queryset(self):
        contest_code = self.kwargs.get('contest_code')
        return ContestAnnouncement.get_announcements_by_contest_code(contest_code)


class OngoingContestsRetrieveView(APIView):
    
    def get(self, *args, **kwargs):
        now = timezone.now()
        ongoing_contests = Contest.objects.filter(Q(start_time__lte=now), Q(end_time__gte=now))
        serialized_data = ContestSerializer(ongoing_contests, many=True)

        return Response(serialized_data.data)


class RegisterInContestView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthentication, TokenAuthentication)

    def post(self, request, code):
        
        contest = get_object_or_404(Contest, code=code)

        if contest.registrations.filter(user=request.user).exists():
            return Response({'message': 'You are already registered for this contest.'},
                status=HTTP_400_BAD_REQUEST)
        
        registration = ContestRegistration.objects.create(user=request.user, contest=contest)
        registration_serialized = RegistrationSerializer(registration)

        return Response(registration_serialized.data, status=HTTP_201_CREATED)
        
    def delete(self, request, code):
        contest = get_object_or_404(Contest, code=code)
        now = timezone.now()

    
    def is_registration_time_valid(self, contest):
        now = timezone.now()
        if now > contest.start_time:
            raise ''