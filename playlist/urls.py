from django.conf.urls import url
from playlist import views

urlpatterns = [
	url(r'^playlist/$', views.playlist_list),
	url(r'^playlist/(?P<pk>[0-9]+)/$', views.playlist_detail),
	url(r'^songlist/$', views.song_list),
	url(r'^playlistsongs/(?P<p_id>[0-9]+)/$', views.song_for_playlist),
]