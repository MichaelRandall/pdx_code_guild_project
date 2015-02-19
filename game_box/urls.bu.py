from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'game_box.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^guess_mod/', include('guess_mod.urls')),

    url(r'^add_game/?$', 'guess_mod.views.add_game'),
)
