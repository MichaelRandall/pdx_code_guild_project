from django import forms
from django.contrib.auth.models import User
from guess_mod.models import Gamer, Game, Moves


class GameForm(forms.ModelForm):
    game_date = forms.DateField()
    game_start = forms.TimeField()
    game_end = forms.TimeField()
    game_duration = forms.TimeField()
    total_moves = forms.IntegerField()
    incorrect_moves = forms.IntegerField()
    icon_set = forms.CharField(max_length=100)
    grid_count = forms.IntegerField()

    class Meta:
        model = Game


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class GamerProfileForm(forms.ModelForm):
    class Meta:
        model = Gamer
        fields = ('picture',)


class MovesForm(forms.ModelForm):
    move_start = forms.TimeField()
    move_end = forms.TimeField()
    move_outcome = forms.CharField(max_length=100)

    class Meta:
        model = Moves
