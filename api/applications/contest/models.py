from django.db import models
from django.db.models import Q
from django.utils import timezone
from enum import Enum
from applications.user.models import User
from applications.contest.constants import ProblemType, PLanguage, CodeSubmissionStatusChoice as StatusChoice


CODE_MAX_LENGTH = 10
NAME_MAX_LENGTH = 20
TEXT_MAX_LENGTH = 500
RESOURCE_LIMIT_DECIMAL_PLACES = 2
RESOURCE_LIMIT_MAX_DIGITS = 10


class Contest(models.Model):
    creator = models.ForeignKey(User, related_name='contests_created',
                                null=True, on_delete=models.SET_NULL)
    code = models.CharField(max_length=CODE_MAX_LENGTH, blank=False, unique=True)
    name = models.CharField(max_length=NAME_MAX_LENGTH, blank=False)
    description = models.TextField(max_length=TEXT_MAX_LENGTH, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_public = models.BooleanField(default=False)
    added_ts = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'contest'

    def __str__(self):
        return f'{self.code} - by {self.creator}'

    @staticmethod
    def get_ongoing_contests_in_queryset(queryset):
        now = timezone.now()
        return queryset.filter(Q(start_time__lte=now), Q(end_time__gte=now))

    @staticmethod
    def get_past_contests_in_queryset(queryset):
        now = timezone.now()
        return queryset.filter(Q(end_time__lt=now))

    @staticmethod
    def get_upcoming_contests_in_queryset(queryset):
        now = timezone.now()
        return queryset.filter(Q(start_time__gt=now))


class ContestRegistration(models.Model):
    user = models.ForeignKey(User, related_name='contests_registrations', on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, related_name='registrations', on_delete=models.CASCADE)
    added_ts = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'contest_registration'
        unique_together = (('user', 'contest'),)

    def __str__(self):
        return f'{self.user} registered in {self.contest}'

class ContestAnnouncement(models.Model):
    contest = models.ForeignKey(Contest, related_name='announcements', on_delete=models.CASCADE)
    announcer = models.ForeignKey(User, related_name='announced', null=True, on_delete=models.SET_NULL)
    text = models.TextField(max_length=300)
    added_ts = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'contest_announcement'

    @staticmethod
    def get_announcements_by_contest_code(contest_code):
        return ContestAnnouncement.objects.filter(contest__code=contest_code)

class Tag(models.Model):
    abbr = models.CharField(max_length=10, blank=False)
    name = models.CharField(max_length=20, blank=False)

    class Meta:
        db_table = 'tag'

    def __str__(self):
        return f'{self.abbr} means {self.name}'


class CodeProblem(models.Model):
    author = models.ForeignKey(User, related_name='code_problems',
                               null=True, on_delete=models.SET_NULL)
    code = models.CharField(max_length=CODE_MAX_LENGTH, blank=False, unique=True)
    name = models.CharField(max_length=NAME_MAX_LENGTH, blank=False)
    statement = models.TextField(max_length=TEXT_MAX_LENGTH, blank=False)
    tags = models.ManyToManyField(Tag, related_name='code_problems')
    time_limit = models.DecimalField(max_digits=RESOURCE_LIMIT_MAX_DIGITS, 
                                     decimal_places=RESOURCE_LIMIT_DECIMAL_PLACES, default=1.0)
    memory_limit_in_mb = models.DecimalField(max_digits=RESOURCE_LIMIT_MAX_DIGITS, 
                                             decimal_places=RESOURCE_LIMIT_DECIMAL_PLACES,
                                             default=512.0)
    added_ts = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'code_problem'

    def __str__(self):
        return f'{self.code} by {self.author}'


class MCQProblem(models.Model):
    author = models.ForeignKey(User, related_name='mcq_problems', null=True, on_delete=models.SET_NULL)
    code = models.CharField(max_length=10, blank=False)
    statement = models.TextField(max_length=TEXT_MAX_LENGTH, blank=False)
    tags = models.ManyToManyField(Tag, related_name='mcq_problems')
    multiple_correct = models.BooleanField(default=False)
    added_ts = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'mcq_problem'

    def __str__(self):
        return f'{self.code} by {self.author}'


class MCQOption(models.Model):
    problem = models.ForeignKey(MCQProblem, related_name='choices', on_delete=models.CASCADE)
    text = models.TextField(max_length=TEXT_MAX_LENGTH, blank=False)
    is_correct = models.BooleanField(default=False)
    added_ts = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'mcq_option'


class CodeSubmission(models.Model):
    submittor = models.ForeignKey(User, related_name='code_submisssions', on_delete=models.CASCADE)
    problem = models.ForeignKey(CodeProblem, related_name='submissions', on_delete=models.CASCADE)
    solution = models.TextField(max_length=2000, blank=False)
    language = models.CharField(max_length=10,
                                choices=((lang, lang.value) for lang in PLanguage))
    status = models.CharField(max_length=10,
                              choices=((choice, choice.value) for choice in StatusChoice))
    remark = models.CharField(max_length=100, blank=True)
    added_ts = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'code_submission'


class MCQSubmission(models.Model):

    class StatusChoice(Enum):
        PENDING = 'pending'
        WRONG = 'wa'
        CORRECT = 'ac'

    submittor = models.ForeignKey(User, related_name='mcq_submisssions', on_delete=models.CASCADE)
    problem = models.ForeignKey(MCQProblem, related_name='submissions', on_delete=models.CASCADE)
    selected_option = models.ForeignKey(MCQOption, related_name='ac_submissions',
                                        on_delete=models.CASCADE)
    status = models.CharField(max_length=10,
                              choices=((choice, choice.value) for choice in StatusChoice))
    added_ts = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'mcq_submission'


class Ranking(models.Model):
    contest = models.ForeignKey(Contest, related_name='user_rank', on_delete=models.CASCADE)
    participant = models.ForeignKey(User, related_name='rank', on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        db_table = 'ranking'