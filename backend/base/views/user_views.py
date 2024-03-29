from rest_framework.response import Response
from base.serializers import  UserSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.db import IntegrityError



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
     
    def validate(self,attrs):
       data = super().validate(attrs)

       serializer = UserSerializerWithToken(self.user).data

       for key,value in serializer.items():
          data[key]=value


       return data
       
class MyTokenObtainPairView(TokenObtainPairView):
   serializer_class = MyTokenObtainPairSerializer    

@api_view(['POST'])
def registerUser(request):
  data = request.data
  try:
    print(data)
    user=User.objects.create(
        first_name = data['name'],
        username = data['email'],
        email= data['email'],
        password = make_password(data['password'])
    )
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)
  except IntegrityError as e:
            return Response({'detail': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
  except Exception as e:
     message = {'detail': e}
     return Response(message,status=status.HTTP_400_BAD_REQUEST)
  


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer= UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
  user = request.user
  print(user.first_name)

  serializer= UserSerializerWithToken(user, many=False)
  data = request.data
  print(data)
  for key,value in data.items():
     setattr(user,key,value)
     print(user.first_name)
  password =  data.get('password')
  if password is not None:
     user.password=make_password(password)
   
  user.save()
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
  users=User.objects.all()
  serializer= UserSerializer(users, many=True)
  return Response(serializer.data)