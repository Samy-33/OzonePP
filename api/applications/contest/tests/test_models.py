from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from model_mommy import mommy
from applications.contest.models import (Contest,
    ContestRegistration, ContestAnnouncement, Tag,
    CodeProblem, MCQProblem)


class ContestModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):

        now = timezone.now()

        mommy.make(Contest, start_time=now, end_time=now+timedelta(hours=5),
            _quantity=3, _fill_optional=True)
        mommy.make(Contest, start_time=now-timedelta(hours=4),
            end_time=now-timedelta(hours=2), _fill_optional=True)
        mommy.make(Contest, start_time=now+timedelta(hours=2), end_time=now+timedelta(hours=5),
            _quantity=2, _fill_optional=True)

    def setUp(self):
        self.all_contests = Contest.objects.all()

    def test_contest_table_name_is_contest(self):
        """Contest table should be 'contest'
        """
        table_name = Contest._meta.db_table

        self.assertEqual(table_name, 'contest')

    def test_contest_str_value_code_then_creater(self):
        """Contest str value should be 'code - by creator_username'
        """
        contest = Contest.objects.get(id=1)

        expected_value = f'{contest.code} - by {contest.creator.username}'
        self.assertEquals(expected_value, str(contest))

    def test_get_ongoing_contests_should_return_3_entries(self):
        """get_ongoing_contests_from_queryset should return 3 entries
        """
        found = len(Contest.get_ongoing_contests_in_queryset(self.all_contests))
        self.assertEquals(found, 3)

    def test_get_past_contests_should_return_1_entry(self):
        """get_past_contests_from_queryset should return 1 entry
        """
        found = len(Contest.get_past_contests_in_queryset(self.all_contests))
        self.assertEquals(found, 1)

    def test_get_upcoming_contests_should_return_2_entries(self):
        """get_upcoming_contests_from_queryset should return 2 entries
        """
        found = len(Contest.get_upcoming_contests_in_queryset(self.all_contests))
        self.assertEquals(found, 2)


class ContestRegistrationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        mommy.make(ContestRegistration, _fill_optional=True)

    def test_db_table_name_must_be_contest_registration(self):
        """db table name for model Contest Registration
        must be contest_registration
        """
        db_table = ContestRegistration._meta.db_table
        self.assertEquals(db_table, 'contest_registration')

    def test_str_value_of_instance(self):
        registration = ContestRegistration.objects.get(pk=1)

        expected = f'{registration.user.username} registered in {registration.contest}'
        self.assertEquals(str(registration), expected)


class ContestAnnouncementModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        mommy.make(ContestAnnouncement, contest__code='CODE', __fill_optional=True)

    def test_db_table_name_must_be_contest_announcement(self):
        """db table name for model Contest Registration
        must be contest_announcement
        """
        db_table = ContestAnnouncement._meta.db_table
        self.assertEquals(db_table, 'contest_announcement')

    def test_get_announcement_by_contest_code_must_have_1_entry(self):
        """get_announcement_by_contest_code('CODE') must return 1 entry
        """
        found = len(ContestAnnouncement.get_announcements_by_contest_code('CODE'))
        self.assertEquals(found, 1)


class TagModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        mommy.make(Tag, _fill_optional=True)

    def test_db_table_name_must_be_tag(self):
        """db_table name for model Tag must be 'tag'
        """
        db_table = Tag._meta.db_table
        self.assertEquals(db_table, 'tag')

    def test_str_value_of_tag_model(self):
        """str value of tag model must be 'abbr means name'
        """
        tag = Tag.objects.get(pk=1)
        expected = f'{tag.abbr} means {tag.name}'
        self.assertEquals(str(tag), expected)


class CodeProblemModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        mommy.make(CodeProblem, _fill_optional=True)

    def test_db_table_name_must_be_code_problem(self):
        """db_table name for model Tag must be 'code_problem'
        """
        db_table = CodeProblem._meta.db_table
        self.assertEquals(db_table, 'code_problem')

    def test_str_value_code_problem_model(self):
        """str value of CodeProblem must be 'code by author_username'
        """
        problem = CodeProblem.objects.get(pk=1)
        expected = f'{problem.code} by {problem.author.username}'

        self.assertEquals(str(problem), expected)


class MCQProblemModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        mommy.make(MCQProblem, _fill_optional=True)

    def test_db_table_name_must_be_mcq_problem(self):
        """db_table name for model Tag must be 'mcq_problem'
        """
        db_table = MCQProblem._meta.db_table
        self.assertEquals(db_table, 'mcq_problem')

    def test_str_value_mcq_problem_model(self):
        """str value of MCQProblem must be 'code by author_username'
        """
        problem = MCQProblem.objects.get(pk=1)
        expected = f'{problem.code} by {problem.author.username}'

        self.assertEquals(str(problem), expected)
