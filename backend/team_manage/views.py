from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TeamMemberSerializer
from .models import TeamMember

# Create your views here.


class TeamMemberView(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.all()
