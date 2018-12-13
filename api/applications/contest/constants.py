from enum import Enum


class ProblemType(Enum):
    CODE_PROBLEM = 'cp'
    MULTIPLE_CHOICE = 'mc'


class PLanguage(Enum):
    C = 'c'
    CPP = 'cpp'
    PYTHON2 = 'py2'
    PYTHON3 = 'py3'
    JAVA = 'java'
