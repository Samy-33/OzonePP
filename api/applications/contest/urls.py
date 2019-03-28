from django.urls import path
from .views import ContestListView, ContestRUDView, RegisterInContestView, ContestAnnouncementListView

app_name = 'contest'

urlpatterns = [
    path('', ContestListView.as_view(), name='contest-list'),
    path('<str:code>/', ContestRUDView.as_view(), name='contest-rud'),
    path('<str:code>/register/', RegisterInContestView.as_view(), name='register-contest'),
    path('<str:contest_code>/announcements/', ContestAnnouncementListView.as_view(), name='contest-announcements')
]