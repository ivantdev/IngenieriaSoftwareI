from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Protocol, Specialty
from .serializers import ProtocolSerializer, SpecialtySerializer


class SpecialtyViewSet(viewsets.ModelViewSet):
    queryset = Specialty.objects.all()
    serializer_class = SpecialtySerializer
    permission_classes = [IsAuthenticated]


class ProtocolViewSet(viewsets.ModelViewSet):
    serializer_class = ProtocolSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Protocol.objects.all()
        sub_specialty = self.request.query_params.get("sub_specialty", None)
        if sub_specialty is not None:
            return queryset.filter(sub_specialty=int(sub_specialty))
        return []
