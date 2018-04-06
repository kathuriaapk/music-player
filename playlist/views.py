import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.contrib.auth import authenticate, login, logout
from .models import *
from .serializers import *
import datetime

# Create your views here.
def index(request):
	return render(request, 'playlist/index.html', )

def login_user(request):
	if request.method == 'POST':
		data = JSONParser().parse(request)
		username = data['username']
		password = data['password']
		user = authenticate(username=username, password = password)
		if user is not None:
			login(request, user)
			response = HttpResponse("")
			response.set_cookie('user_name', request.user.username)
			response.set_cookie('user_id', request.user.id)
			return response
	return HttpResponse(status=404)

def logout_user(request):	
	logout(request)
	response = HttpResponse('')
	response.delete_cookie('user_name')
	response.delete_cookie('user_id')
	return response

def playlist_list(request):
	if request.method == 'GET':
		playlist = Playlist.objects.filter(user=request.user)
		serializer = PlaylistSerializer(playlist, many=True)
		print(serializer)
		return JsonResponse(serializer.data, safe=False)

	elif request.method == 'POST':
		data = JSONParser().parse(request)
		serializer = PlaylistSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data, status=201)
		return JsonResponse(serializer.errors, status=400)

def playlist_detail(request, pk):
	try:
		playlist = Playlist.objects.get(pk=pk , user=request.user)
	except Playlist.DoesNotExist:
		return HttpResponse(status=404)

	if request.method == 'GET':
		serializer = PlaylistSerializer(playlist)
		return JsonResponse(serializer.data)

	elif request.method == 'PATCH':
		data = JSONParser().parse(request)
		print(data)
		songlist = [song.id for song in Song.objects.filter(playlist=pk)]
		if 'newSong' in data:
			songlist.insert(0,data['newSong'])
		elif 'removeSong' in data:
			songlist.remove(data['removeSong'])
		else:
			return JsonResponse(status=400) 
		serializer = PlaylistSerializer(playlist, data ={'songs':songlist}, partial=True)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data)
		return JsonResponse(serializer.errors, status = 400)

	elif request.method == 'DELETE':
		playlist.delete()
		return HttpResponse(status=204)

def song_list(request):
	if request.method == 'GET':
		song = Song.objects.all()
		serializer = SongSerializer(song, many=True)
		return JsonResponse(serializer.data, safe=False)
	return JsonResponse(serializer.errors, status=400)


def song_for_playlist(request, p_id):
	try:
		song = Song.objects.filter(playlist=Playlist.objects.get(pk = p_id, user = request.user))
	except	(Playlist.DoesNotExist, Song.DoesNotExist):
		return HttpResponse(status=404)
	
	if request.method == 'GET':
		serializer = SongSerializer(song, many=True)
		return JsonResponse(serializer.data, safe=False)


	



