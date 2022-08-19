from django.conf.urls import url
from matchmaking_app import views

urlpatterns=[
    url(r'^matchmaking$', views.matchmakingApi),
    url(r'^matchmaking/([0-9]+)$', views.matchmakingApi),
    url(r'^recommend$', views.recommendApi),
    url(r'^recommend/([0-9]+)$', views.recommendApi),
]