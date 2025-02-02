from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from .models import Protocol
from .serializers import ProtocolSerializer


class ProtocolViewSet(viewsets.ModelViewSet):
    queryset = Protocol.objects.all()
    serializer_class = ProtocolSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
