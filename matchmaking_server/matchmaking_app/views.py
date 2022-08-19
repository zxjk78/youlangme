from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from time import sleep

from django.core.cache import cache
from django_redis import get_redis_connection
import redis

from matchmaking_app.tasks import matching
from matchmaking_app.tasks import recommend


def responseData(msg, opponent_id, session_id):
    data = {
        "message" : msg,
        "opponentId" : opponent_id,
        "sessionId" : session_id
    }
    return data 

@csrf_exempt
def recommendApi(request):
    if request.method=='POST':
        user = JSONParser().parse(request)
        return JsonResponse(recommend(user), safe=False)

@csrf_exempt
def matchmakingApi(request):
    if request.method=='POST':
        user = JSONParser().parse(request)
        # local
        #con = redis.StrictRedis(host="localhost", port=6379, charset="utf-8", decode_responses=True)
        # deploy
        con = redis.StrictRedis(host="172.17.0.1", port=6379, charset="utf-8", decode_responses=True)
        user_id = user['id']
        user_mylang = user['mylanguage']
        user_yourlang = user['yourlanguage']
        user_age = user['age']
        user_gender = user['gender']
        user_nationality = user['nationality']        
        user_favorites = user['favorites']
        user_info = {
            "id" : user_id,
            "age" : user_age,
            "gender" : user_gender,
            "nationality" : user_nationality,
            "favorites" : ' '.join(map(str,user_favorites)),
            "opnt" : -1,
            "count" : 0,
            "done" : 'no',
            "mylang" : user_mylang,
            "yourlang" : user_yourlang,
            "sessionId" : -1
        }

        if con.hgetall(user_id):
            return JsonResponse(responseData("Already exist", "-1", "-1"), safe=False)
            # con.lrem(user_info['mylang'] + " " + user_info['yourlang'], 1, user_id)
            # con.lrem("matchingOrder", 1, user_id)
            # con.delete(user_id)


        waiting_list = (user_mylang + " " + user_yourlang)

        con.rpush("matchingOrder", user_id)
        con.rpush(waiting_list, user_id)
        con.hmset(user['id'], user_info)


        for i in range(1, 60):
            opponent_id = con.hget(user['id'], "opnt")
            if opponent_id != "-1":
                session_id = con.hget(user['id'], "sessionId")
                con.delete(user_id)
                return JsonResponse(responseData("Matched Successfully", opponent_id, session_id), safe=False)
            sleep(1)
        

        con.lrem(user_info['mylang'] + " " + user_info['yourlang'], 1, user_id)
        con.lrem("matchingOrder", 1, user_id)
        con.delete(user_id)
        return JsonResponse(responseData("Matching Failed", "-1", "-1"), safe=False)