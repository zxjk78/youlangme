from background_task import background
from django_redis import get_redis_connection
import redis
import pandas as pd
import numpy as np
from collections import deque
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder
from numpy import dot
from numpy.linalg import norm
import time

FAVOIRTE_NUM = 15

def vectorize(user):
    favoriteFlags = [0 for i in range(FAVOIRTE_NUM)]
    for favoriteId in user["favorites"]:
        favoriteFlags[favoriteId] = 1

    return favoriteFlags

def cos_sim(A, B):
  return dot(A, B)/(norm(A)*norm(B))

def normalize(data):
    # 0~1값으로 normalize
    min_val = min(data)
    if min_val < 0:
        data = [x + abs(min_val) for x in data]
    max_val = max(data)
    return [x/max_val for x in data]

def one_hot_encoding(df, enc_col):
    # String to one hot encode
    ohe_df = pd.get_dummies(df[enc_col])
    ohe_df.reset_index(drop = True, inplace =True)
    return pd.concat([df, ohe_df], axis = 1)

genderList = ["MALE", "FEMALE"]
nationalityList = ["KOREA", "JAPAN", "CHINA", "AMERICA"]
MATCH_SCORE = 0.7

#@background(schedule=3)
def matching():
    print("background processing....")
    con = redis.StrictRedis(host="localhost", port=6379, charset="utf-8", decode_responses=True)
    visited = set()

    matchingOrder = con.lrange("matchingOrder", 0, -1)
    for userId in matchingOrder:
        userInfo = con.hgetall(userId)
        if not userInfo or userInfo['done'] == 'yes':
            continue
        targetKey = userInfo['yourlang'] + " " + userInfo['mylang'] 
        targetUserIdList = con.lrange(targetKey, 0, -1)
        targetUserList = []
        targetUserList.append(userInfo)
        for targetUserId in targetUserIdList:
            targetUser = con.hgetall(targetUserId)
            if not targetUser or targetUser['done'] == 'yes':
                continue
            targetUserList.append(targetUser)
        
        df = pd.DataFrame(targetUserList)
        df_favo = df['favorites'].to_numpy()

        vectorArray = []
        for i in df_favo:
            vec = [0 for v in range(FAVOIRTE_NUM)]
            for j in i.split(" "):
                vec[int(j)] = 1
            vectorArray.append(vec)

        idList = df['id'].tolist()
        countList = df['count'].tolist()

        user_count = countList[0]
        isMatched = False
        opponentId = -1
        for i in range(1, len(vectorArray)):
            sim = cos_sim(vectorArray[0], vectorArray[i])
            score = sim + (float(user_count) * 0.1)
            if score >= MATCH_SCORE:
                # 현재 검사하는 유저가 기준을 넘는 상대를 찾음 ( 수정 필요 )
                target_count = countList[i]
                target_score = sim + (float(target_count) * 0.1)
                if target_score >= MATCH_SCORE:
                    isMatched = True
                    print(score, target_score)
                    opponentId = idList[i]
                    break
        if isMatched:
            print("OUT : ", userId, opponentId)
            con.lrem(userInfo['mylang'] + " " + userInfo['yourlang'], 1, userId)
            con.lrem(targetKey, 1, opponentId)
            con.lrem("matchingOrder", 1, userId)
            con.lrem("matchingOrder", 1, opponentId)
            con.hset(userId, "done", "yes")
            con.hset(opponentId, "done", "yes")
            con.hset(userId, "opnt", opponentId)
            con.hset(opponentId, "opnt", userId)
            time_ = time.time()
            sessionId = str(userId) + "@" + str(opponentId) + "@" + str(time_)
            con.hset(userId, "sessionId", sessionId)
            con.hset(opponentId, "sessionId", sessionId)

    # 한 Matching cycle이 진행된 이후
    for userId in matchingOrder:
        userCount = con.hget(userId, "count")
        if userCount is None:
            continue
        con.hset(userId, "count", int(userCount) + 1)


