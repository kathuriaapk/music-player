from rest_framework import serializers
from .models import *

class SongSerializer(serializers.ModelSerializer):
	class Meta:
		model = Song
		fields = ('id','name','artist','file')

class PlaylistSerializer(serializers.ModelSerializer):
	class Meta:
		model = Playlist
		fields = ('id','name', 'user', 'songs')


