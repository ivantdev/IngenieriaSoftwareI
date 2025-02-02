from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")
        read_only_fields = ("id",)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})
    password_confirmation = serializers.CharField(
        write_only=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "password",
            "password_confirmation",
        ]

    def validate(self, data):
        first_name = data.get("first_name")
        if not first_name or len(first_name) < 2:
            raise serializers.ValidationError(
                {"first_name": "First name must be at least 2 characters long"}
            )
        
        last_name = data.get("last_name")
        if not last_name or len(last_name) < 2:
            raise serializers.ValidationError(
                {"last_name": "First name must be at least 2 characters long"}
            )
        
        email = data.get("email")
        if not email:
            raise serializers.ValidationError({"email": "Email is required"})

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email is invalid"})

        if data.get("password") != data.get("password_confirmation"):
            raise serializers.ValidationError(
                {"password_confirmation": "Mismatching passwords"}
            )
        return data

    def create(self, validated_data):
        validated_data.pop("password_confirmation")
        email = validated_data.get("email")

        validated_data["username"] = email
        user = User.objects.create_user(**validated_data)
        return user
