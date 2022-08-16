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
import json

FAVOIRTE_NUM = 15
MAX_SCORE = 0.8
MIN_SCORE = 0.5
MIN_RATIO = 0.2
STANDARD_RATIO = 0.8

def recommend(user):
    user_id = int(user['id'])
    # local
    #conn = pymysql.connect(host="localhost", user="a603", password="youlangme", db="youlangme")
    # deploy
    conn = pymysql.connect(host="172.21.0.1", port=3306, user="a603", password="youlangme", db="youlangme")
    curs = conn.cursor()
    query = "SELECT u.id, f.favorite_id FROM user AS u INNER JOIN user_favorite AS f ON u.id = f.user_id"
    curs.execute(query)
    user_data = curs.fetchall()
    user_favorite = dict()
    user_similarity = dict()
    for row in user_data:
        key = row[0]
        value = row[1]
        if key not in user_favorite.keys():
            vec = [0 for v in range(FAVOIRTE_NUM)]
            vec[int(value)] = 1
            user_favorite[key] = vec
        else:
            user_favorite[key][int(value)] = 1
    target_favorite = user_favorite[user_id]
    for k in user_favorite.keys():
        if k == user_id:
            continue
        sim = cos_sim(target_favorite, user_favorite[k])
        user_similarity[k] = round(sim, 4)
    print(user_similarity)
    return user_similarity

def calculate():
    print("background calculating...")
    # local
    #conn = pymysql.connect(host="localhost", user="a603", password="youlangme", db="youlangme")
    # deploy
    conn = pymysql.connect(host="172.21.0.1", port=3306, user="a603", password="youlangme", db="youlangme")
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
    # local
    #con = redis.StrictRedis(host="localhost", port=6379, charset="utf-8", decode_responses=True)
    # deploy
    con = redis.StrictRedis(host="172.17.0.1", port=6379, charset="utf-8", decode_responses=True)
    con.set("match_score", renewal_score)

def cos_sim(A, B):
  return dot(A, B)/(norm(A)*norm(B))

def matching():
    # local
    # con = redis.StrictRedis(host="localhost", port=6379, charset="utf-8", decode_responses=True)
    # deploy
    con = redis.StrictRedis(host="172.17.0.1", port=6379, charset="utf-8", decode_responses=True)
    current_score = con.get("match_score")
    if current_score is None:
        current_score = 0.7
    current_score = float(current_score)
    print("background processing....", current_score)
    visited = set()
    matching_order = con.lrange("matchingOrder", 0, -1)
    for user_id in matching_order:
        user_info = con.hgetall(user_id)
        if not user_info or user_info['done'] == 'yes':
            continue
        target_key = user_info['yourlang'] + " " + user_info['mylang'] 
        target_user_id_list = con.lrange(target_key, 0, -1)
        target_user_list = []
        target_user_list.append(user_info)
        for target_user_id in target_user_id_list:
            target_user = con.hgetall(target_user_id)
            if not target_user or target_user['done'] == 'yes':
                continue
            target_user_list.append(target_user)
        
        df = pd.DataFrame(target_user_list)
        df_favo = df['favorites'].to_numpy()

        vector_array = []
        for i in df_favo:
            vec = [0 for v in range(FAVOIRTE_NUM)]
            for j in i.split(" "):
                vec[int(j)] = 1
            vector_array.append(vec)

        id_list = df['id'].tolist()
        count_list = df['count'].tolist()

        user_count = count_list[0]
        is_matched = False
        opponent_id = -1
        for i in range(1, len(vector_array)):
            sim = cos_sim(vector_array[0], vector_array[i])
            score = sim + (float(user_count) * 0.05)
            if score >= current_score:
                target_count = count_list[i]
                target_score = sim + (float(target_count) * 0.05)
                if target_score >= current_score:
                    is_matched = True
                    print(score, target_score)
                    opponent_id = id_list[i]
                    break
        if is_matched:
            print("OUT : ", user_id, opponent_id)
            con.lrem(user_info['mylang'] + " " + user_info['yourlang'], 1, user_id)
            con.lrem(target_key, 1, opponent_id)
            con.lrem("matchingOrder", 1, user_id)
            con.lrem("matchingOrder", 1, opponent_id)
            con.hset(user_id, "done", "yes")
            con.hset(opponent_id, "done", "yes")
            con.hset(user_id, "opnt", opponent_id)
            con.hset(opponent_id, "opnt", user_id)
            time_ = time.time()
            session_id = str(user_id) + "@" + str(opponent_id) + "@" + str(time_)
            con.hset(user_id, "sessionId", session_id)
            con.hset(opponent_id, "sessionId", session_id)

    # 한 Matching cycle이 진행된 이후
    for user_id in matching_order:
        user_count = con.hget(user_id, "count")
        if user_count is None:
            continue
        con.hset(user_id, "count", int(user_count) + 1)


