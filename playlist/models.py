from .validators import validate_file_extension
from django.db import models
from django.contrib.auth.models import User
# Create your models here\\.
class Song(models.Model):
	name = models.CharField(max_length=100)
	artist = models.CharField(max_length=100)
	file = models.FileField(upload_to='songs/', validators=[validate_file_extension])

	def __str__(self):
		return self.name
	
	def validate_file_extension(value):
		ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
		valid_extensions = ['.mp3']
		if not ext.lower() in valid_extensions:
			raise ValidationError(u'Unsupported file extension.')

class Playlist(models.Model):
	name = models.CharField(max_length = 100)
	songs = models.ManyToManyField(Song, blank=True)
	user = models.ForeignKey(User)

	def __str__(self):
		return self.name

