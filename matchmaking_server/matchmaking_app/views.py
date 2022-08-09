from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from time import sleep

from django.core.cache import cache
from django_redis import get_redis_connection
import redis

from matchmaking_app.tasks import matching

def responseData(msg, opponentId, sessionId):
    data = {
        "message" : msg,
        "opponentId" : opponentId,
        "sessionId" : sessionId
    }
    return data 

# Create your views here.
@csrf_exempt
def matchmakingApi(request):
    # if request.method=='GET':
    #     matching(repeat=3)
    #     return JsonResponse("Background Start Successfully", safe=False)

    if request.method=='POST':
        user = JSONParser().parse(request)
        con = redis.StrictRedis(host="localhost", port=6379, charset="utf-8", decode_responses=True)
        user_id = user['id']
        
        user_mylang = user['mylanguage']
        user_yourlang = user['yourlanguage']
        
        user_age = user['age']
        user_gender = user['gender']
        user_nationality = user['nationality']
        
        user_favorites = user['favorites']

        if con.hgetall(user_id):
            return JsonResponse(responseData("Already exist", -1), safe=False)

        userInfo = {
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

        waitingList = (user_mylang + " " + user_yourlang)

        con.rpush("matchingOrder", user_id)
        con.rpush(waitingList, user_id)
        con.hmset(user['id'], userInfo)


        for i in range(1, 60):
            opponentId = con.hget(user['id'], "opnt")
            if opponentId != "-1":
                sessionId = con.hget(user['id'], "sessionId")
                con.delete(user_id)
                return JsonResponse(responseData("Matched Successfully", opponentId, sessionId), safe=False)
            sleep(1)
        

        con.lrem(userInfo['mylang'] + " " + userInfo['yourlang'], 1, user_id)
        con.lrem("matchingOrder", 1, user_id)
        con.delete(user_id)
        return JsonResponse(responseData("Matching Failed", "-1", "-1"), safe=False)