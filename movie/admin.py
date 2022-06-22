from django.contrib import admin

# Register your models here.
from movie.models import Star, Director, Movie, Genres

admin.site.register(Star)
admin.site.register(Director)
admin.site.register(Genres)
admin.site.register(Movie)
