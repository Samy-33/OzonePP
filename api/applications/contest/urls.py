from django.urls import path
from .views import ContestRUDView, OngoingContestsRetrieveView

app_name = 'contest'

urlpatterns = [
    path('', ContestRUDView.as_view(), name='contest-rud'),
    path('ongoing/', OngoingContestsRetrieveView.as_view(), name='ongoing-contests')
]