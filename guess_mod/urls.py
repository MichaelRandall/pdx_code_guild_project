from django.conf.urls import patterns, url
from guess_mod import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),
    url(r'^game/$', views.game, name='game'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^restricted/$', views.restricted, name='restricted'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^add_new_game/$', views.add_new_game, name='add_new_game'),
    url(r'^add_moves_current_game/$', views.add_moves_current_game, name='add_moves_current_game'),
    )
