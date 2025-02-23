from rest_framework import serializers
from .models import Protocol, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category_name"]


class ProtocolSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True
    )

    class Meta:
        model = Protocol
        fields = [
            "id",
            "name",
            "description",
            "file",
            "created_at",
            "updated_at",
            "category",
            "category_id",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
