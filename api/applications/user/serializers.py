from django.contrib.auth import authenticate
from rest_framework import serializers
from applications.user.models import User


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data.get('username'),
                                        validated_data.get('email'),
                                        validated_data.get('password'))
        user.first_name = validated_data.get('first_name')
        user.last_name = validated_data.get('last_name')
        user.save()

        return user


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if user and user.is_active:
            return user
        raise serializers.ValidationError('Invalid Credentials Provided')


class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.ReadOnlyField()

    class Meta(object):
        model = User
        fields = ('username', 'email', 'first_name', 'last_name',
                  'date_joined', 'password')
