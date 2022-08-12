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
import pymysql

FAVOIRTE_NUM = 15
MAX_SCORE = 0.8
MIN_SCORE = 0.5
MIN_RATIO = 0.2
STANDARD_RATIO = 0.8

def calculate():
    print("background calculating...")
    conn = pymysql.connect(host="localhost", user="a603", password="youlangme", db="youlangme")
    curs = conn.cursor()
    query = "CREATE TABLE IF NOT EXISTS matching_score_log (id bigint auto_increment primary key, score double)"
    curs.execute(query)
    query = "SELECT score FROM matching_score_log ORDER BY id DESC LIMIT 1"
    curs.execute(query)
    recent_value = curs.fetchall()
    renewal_score = 0.7
    if len(recent_value) != 0:
        current_score = recent_value[0][0]
        curs.execute("SELECT feedback FROM matching_feedback ORDER BY id DESC LIMIT 100")
        data = curs.fetchall()
        if len(data) != 0:
            like = 0
            for row in data:
                like += int(row[0])
            ratio = like / len(data)
            if ratio < STANDARD_RATIO:
                ratio = min(MIN_RATIO, STANDARD_RATIO - ratio)
                score = current_score + ((MAX_SCORE - current_score) * ratio)
                score = min(score, MAX_SCORE)
            else:
                ratio = min(MIN_RATIO, ratio - STANDARD_RATIO)
                score = current_score - ((current_score - MIN_SCORE) * ratio)
                score = max(score, MIN_SCORE)
            renewal_score = round(score, 3)
    query = "INSERT INTO matching_score_log (score) VALUES (%s)"
    curs.execute(query, renewal_score)
    curs.close()
    conn.commit()
    con = redis.StrictRedis(host="localhost", port=6379, charset="utf-8", decode_responses=True)
    con.set("match_score", renewal_score)

def cos_sim(A, B):
  return dot(A, B)/(norm(A)*norm(B))
    
MATCH_SCORE = 0.7

#@background(schedule=3)
def matching():
    con = redis.StrictRedis(host="localhost", port=6379, charset="utf-8", decode_responses=True)
    current_score = con.get("match_score")
    print("background processing....", current_score)
    correction_score = con.get("score")
    if correction_score is None:
        correction_score = 0
    else:
        correction_score = int(correction_score)
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
            score = sim + (float(user_count) * 0.05)
            if score >= MATCH_SCORE:
                target_count = countList[i]
                target_score = sim + (float(target_count) * 0.05)
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


