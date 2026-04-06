# refs/serializers.py

from rest_framework import serializers
from .models import Ref


class RefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ref
        fields = '__all__'
        read_only_fields = ['id', 'created_at']