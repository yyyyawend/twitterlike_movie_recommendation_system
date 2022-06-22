from django.db import models

from forumUser.models import ForumUser


class Star(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'


class Director(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'


class Genres(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'


class Movie(models.Model):
    title = models.CharField(max_length=100)
    year = models.CharField(max_length=10)
    image_url = models.URLField(max_length=200, blank=True)
    releaseDate = models.DateField()
    runtimeMins = models.CharField(max_length=10)
    overview = models.CharField(max_length=2000)
    directors = models.ManyToManyField(Director, related_name='movies')
    stars = models.ManyToManyField(Star, related_name='movies')
    genres = models.ManyToManyField(Genres, related_name='movies')
    keywords = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.title}({self.year})'

    class Meta:
        ordering = ['title']

    @property
    def vote_average(self):
        ratings = self.ratings.all().values_list('rating', flat=True)
        if len(ratings):
            return round(sum(ratings) / len(ratings),1)
        else:
            return 0

    @property
    def vote_count(self):
        return self.ratings.count()

class Rating(models.Model):
    user = models.ForeignKey(ForumUser, related_name='ratings', on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, related_name='ratings', on_delete=models.CASCADE)
    rating = models.IntegerField()
    rating_time = models.DateTimeField(auto_now_add=True)
