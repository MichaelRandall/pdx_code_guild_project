from django.db import models
from django.contrib.auth.models import User
from datetime import date


class Gamer(models.Model):
    user = models.OneToOneField(User)
    picture = models.ImageField(upload_to='profile_images', blank=True)

    def __unicode__(self):
        return self.user.username + ", " + self.user.email


class Game(models.Model):
    game_date = models.DateField(auto_now_add=True)
    game_start = models.TimeField(auto_now_add=True)
    game_end = models.TimeField(null=True)
    game_duration = models.TimeField(null=True)
    total_moves = models.IntegerField(default=0)
    incorrect_moves = models.IntegerField(default=0)
    icon_set = models.CharField(max_length=100)
    grid_count = models.IntegerField(default=0)
    player = models.ForeignKey(User)

    def __unicode__(self):
        return self


class Moves(models.Model):
    game = models.ForeignKey(Game)
    move_start = models.TimeField(null=True)
    move_end = models.TimeField(null=True)
    move_outcome = models.CharField(max_length=100)

    def __unicode__(self):
        return self.move_outcome
