from applications.user.serializers import CreateUserSerializer, LoginUserSerializer
from applications.user.models import User
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class RegistrationView(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        user_data = JSONParser().parse(request)
        serializer = CreateUserSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'data': serializer.data,
            'token': AuthToken.objects.create(user)
        }, status=status.HTTP_201_CREATED)


class BasicLoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        user_data = request.data
        print(user_data)
        serializer = LoginUserSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            'username': user.username,
            'token': AuthToken.objects.create(user),
        })


class TokenCheckView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        
        return Response({
            'username': request.user.username,
            'isValid': True
        })


class ListUsersView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.all()
        users_json = UserSerializer(users, many=True)
        return Response(users_json.data)