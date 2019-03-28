from django.test import TestCase
from django.utils import timezone
from model_mommy import mommy
from applications.user.models import User

class UserModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):

        mommy.make(User, username='sam', first_name='Saket', last_name='Patel', rating=1788, _fill_optional=True)

        # User.objects.create(
        #     username='sam',
        #     email='sam@ozonepp.tk',
        #     date_joined=timezone.now(),
        #     first_name='Saket',
        #     last_name='Patel',
        #     password='Rocksss',
        #     rating=1788,
        #     contribution_rating=522,
        #     dp_url='https://random.url/image.jpg',
        #     institute='IIITDMJ',
        #     country='India'
        # )

    def test_color_of_user_should_be_blue(self):
        user = User.objects.get(username='sam')
        self.assertEquals(user.color, '#0131e3') # BLUE: '#0131e3'

    def test_full_name_of_user(self):
        user = User.objects.get(username='sam')
        self.assertEquals(user.full_name, 'Saket Patel')