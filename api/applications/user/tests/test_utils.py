from django.test import TestCase
from applications.user.utils import color_code_from_rating


class UserUtilsTest(TestCase):
    def test_color_code_from_rating_more_than_3000(self):
        """Should return color code of RED: '#f01c1c'
        """
        self.assertEquals(color_code_from_rating(3001), '#f01c1c')

    def test_color_code_from_rating_1599(self):
        """Should return color code of CYAN: '#01dce3'
        """
        self.assertEquals(color_code_from_rating(1599), '#01dce3')