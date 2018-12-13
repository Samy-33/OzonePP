from django.db import models
from enum import Enum
from applications.user.models import User
from applications.contest.constants import ProblemType, PLanguage


CODE_MAX_LENGTH = 6
NAME_MAX_LENGTH = 20
TEXT_MAX_LENGTH = 500
RESOURCE_LIMIT_DECIMAL_PLACES = 2
RESOURCE_LIMIT_MAX_DIGITS = 10


class Contest(models.Model):
    creator = models.ForeignKey(User, related_name='contests_created',
                                null=True, on_delete=models.SET_NULL)
    code = models.CharField(max_length=CODE_MAX_LENGTH, blank=False, unique=True)
    name = models.CharField(max_length=NAME_MAX_LENGTH, blank=False)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_public = models.BooleanField(default=False)


class Tag(models.Model):
    abbr = models.CharField(max_length=10, blank=False)
    name = models.CharField(max_length=20, blank=False)


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


class MCQProblem(models.Model):
    author = models.ForeignKey(User, related_name='mcq_problems', null=True, on_delete=models.SET_NULL)
    code = models.CharField(max_length=10, blank=False)
    statement = models.TextField(max_length=TEXT_MAX_LENGTH, blank=False)
    tags = models.ManyToManyField(Tag, related_name='mcq_problems')
    multiple_correct = models.BooleanField(default=False)
    added_ts = models.DateTimeField(auto_now=True)


class MCQOption(models.Model):
    problem = models.ForeignKey(MCQProblem, related_name='choices', on_delete=models.CASCADE)
    text = models.TextField(max_length=TEXT_MAX_LENGTH, blank=False)
    is_correct = models.BooleanField(default=False)
    added_ts = models.DateTimeField(auto_now=True)


class CodeSubmission(models.Model):

    class StatusChoice(Enum):
        PENDING = 'pending'
        COMPILATION_ERROR = 'ce'
        CORRECT = 'ac'
        WRONG = 'wa'
        TIME_LIMIT_EXCEEDED = 'tle'
        RUN_TIME_ERROR = 'rte'

    submittor = models.ForeignKey(User, related_name='code_submisssions', on_delete=models.CASCADE)
    problem = models.ForeignKey(CodeProblem, related_name='submissions', on_delete=models.CASCADE)
    solution = models.TextField(max_length=2000, blank=False)
    language = models.CharField(max_length=10,
                                choices=((lang, lang.value) for lang in PLanguage))
    status = models.CharField(max_length=10,
                              choices=((choice, choice.value) for choice in StatusChoice))
    remark = models.CharField(max_length=100, blank=True)
    added_ts = models.DateTimeField(auto_now=True)


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


class Ranking(models.Model):
    contest = models.ForeignKey(Contest, related_name='user_rank', on_delete=models.CASCADE)
    participant = models.ForeignKey(User, related_name='rank', on_delete=models.CASCADE)
    position = models.IntegerField()