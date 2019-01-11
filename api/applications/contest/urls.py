from django.urls import path
from .views import ContestListView, ContestRUDView, OngoingContestsRetrieveView

app_name = 'contest'

urlpatterns = [
    path('', ContestListView.as_view(), name='contest-list'),
    path('<int:pk>/', ContestRUDView.as_view(), name='contest-rud'),
    path('ongoing/', OngoingContestsRetrieveView.as_view(), name='ongoing-contests')
]