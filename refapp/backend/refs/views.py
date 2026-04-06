# refs/views.py

from rest_framework import viewsets, filters
from .models import Ref
from .serializers import RefSerializer


class RefViewSet(viewsets.ModelViewSet):
    queryset = Ref.objects.all()
    serializer_class = RefSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'category','url']