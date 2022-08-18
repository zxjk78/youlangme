-- ### 고정 데이터 셋 ###
-- Favorite
INSERT INTO favorite(`id`,`name`) VALUES(1,'Movie');
INSERT INTO favorite(`id`,`name`) VALUES(2,'Sports');
INSERT INTO favorite(`id`,`name`) VALUES(3,'Music');
INSERT INTO favorite(`id`,`name`) VALUES(4,'Investment');
INSERT INTO favorite(`id`,`name`) VALUES(5,'Travel');
INSERT INTO favorite(`id`,`name`) VALUES(6,'Coding');
INSERT INTO favorite(`id`,`name`) VALUES(7,'Game');
INSERT INTO favorite(`id`,`name`) VALUES(8,'Food');
INSERT INTO favorite(`id`,`name`) VALUES(9,'Cooking');
INSERT INTO favorite(`id`,`name`) VALUES(10,'Cafe');
INSERT INTO favorite(`id`,`name`) VALUES(11,'Reading');
INSERT INTO favorite(`id`,`name`) VALUES(12,'Pet');
INSERT INTO favorite(`id`,`name`) VALUES(13,'Party');
INSERT INTO favorite(`id`,`name`) VALUES(14,'Collecting');

-- 활동별 경험치 데이터 테이블
INSERT INTO exp_activity(`id`,`exp`,`name`,`exp_update_type`) VALUES (1,20,'WRITE_POST','ADD');
INSERT INTO exp_activity(`id`,`exp`,`name`,`exp_update_type`) VALUES (2,5,'WRITE_REPLY','ADD');
-- 분당 경험치 2 획득
INSERT INTO exp_activity(`id`,`exp`,`name`,`exp_update_type`) VALUES (3,2,'MEETING','MULTI');
INSERT INTO exp_activity(`id`,`exp`,`name`,`exp_update_type`) VALUES (4,10,'ATTENDANCE','ADD');

-- 경험치별 레벨 데이터 테이블
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (1,'Bronze3',0,19);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (2,'Bronze2',20,49);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (3,'Bronze1',50,99);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (4,'Silver3',100,149);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (5,'Silver2',150,199);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (6,'Silver1',200,274);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (7,'Gold3',275,324);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (8,'Gold2',325,399);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (9,'Gold1',400,499);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (10,'Platinum3',500,599);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (11,'Platinum2',600,699);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (12,'Platinum1',700,849);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (13,'Diamond3',850,999);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (14,'Diamond2',1000,1149);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (15,'Diamond1',1150,1499);
INSERT INTO level (`id`, `name`, `min_exp`, `max_exp`) VALUES (16,'Master',1500,2147483647);

--- ### 고정 데이터 셋 end ###

--- ### 시연용 더미 데이터 셋 ###

-- #################  시연용 ID : youlangme@gmail.com / 비밀번호 : youlangme123 #######################
-- 기본 정보
INSERT INTO user VALUES(7603,'2021-08-20 09:30:22.232051','2021-08-21 16:30:22.232051','1999-07-02','hello!','youlangme@gmail.com','MALE',null,'KOREAN','김시연','KOREA','{bcrypt}$2a$10$nS6Pwn1EjWlnRLfi4N0.0.eZ6an/uFD218q1KPp0uix3MfPRGsDEK','ENGLISH');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (7603,'ROLE_USER');
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (7603,0,1,7603);
-- 관심사
INSERT INTO user_favorite VALUES(2001,'2021-08-20 09:30:22.232051','2021-08-20 09:30:22.232051',4,7603);
INSERT INTO user_favorite VALUES(2002,'2021-08-20 09:30:22.232051','2021-08-20 09:30:22.232051',5,7603);
INSERT INTO user_favorite VALUES(2003,'2021-08-20 09:30:22.232051','2021-08-20 09:30:22.232051',9,7603);
-- 출석

INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3001,'2021-08-20 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3002,'2021-08-23 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3003,'2021-08-25 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3004,'2021-09-11 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3005,'2021-09-12 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3006,'2021-09-13 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3007,'2021-09-15 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3008,'2021-09-18 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3009,'2021-09-20 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3010,'2021-09-21 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3011,'2021-09-29 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3012,'2021-09-30 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3013,'2021-10-01 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3014,'2021-10-09 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3015,'2021-10-21 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3016,'2021-10-22 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3017,'2021-10-24 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3018,'2021-10-30 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3019,'2021-11-16 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3020,'2021-11-17 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3021,'2021-11-20 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3022,'2021-11-27 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3023,'2021-12-01 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3024,'2021-12-02 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3025,'2021-12-04 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3026,'2021-12-11 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3027,'2021-12-12 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3028,'2021-12-19 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3029,'2021-12-29 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3030,'2022-02-03 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3031,'2022-02-09 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3032,'2022-02-11 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3033,'2022-02-12 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3034,'2022-02-13 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3035,'2022-02-14 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3036,'2022-02-15 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3037,'2022-02-16 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3038,'2022-02-19 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3039,'2022-02-21 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3040,'2022-02-27 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3041,'2022-03-03 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3042,'2022-03-09 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3043,'2022-03-21 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3044,'2022-03-22 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3045,'2022-04-10 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3046,'2022-04-10 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3047,'2022-04-16 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3048,'2022-04-21 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3049,'2022-04-29 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3050,'2022-05-12 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3051,'2022-05-16 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3052,'2022-05-17 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3053,'2022-05-19 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3054,'2022-05-20 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3055,'2022-05-21 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3056,'2022-06-01 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3057,'2022-06-03 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3058,'2022-06-04 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3059,'2022-06-07 09:30:22.232051',7603);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3060,'2022-06-08 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3061,'2022-06-09 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3062,'2022-06-13 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3063,'2022-06-14 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3064,'2022-06-15 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3065,'2022-06-16 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3066,'2022-06-17 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3067,'2022-06-20 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3068,'2022-06-21 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3069,'2022-06-24 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3070,'2022-07-05 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3071,'2022-07-08 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3072,'2022-07-10 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3073,'2022-07-11 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3074,'2022-07-12 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3075,'2022-07-14 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3076,'2022-07-15 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3077,'2022-07-18 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3078,'2022-07-20 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3079,'2022-07-21 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3080,'2022-07-22 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3081,'2022-07-23 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3082,'2022-07-24 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3083,'2022-07-25 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3084,'2022-07-26 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3085,'2022-07-27 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3086,'2022-07-28 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3087,'2022-07-29 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3088,'2022-07-30 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3089,'2022-08-01 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3090,'2022-08-02 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3091,'2022-08-03 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3092,'2022-08-04 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3093,'2022-08-06 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3094,'2022-08-07 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3095,'2022-08-09 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3096,'2022-08-10 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3097,'2022-08-11 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3098,'2022-08-12 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3099,'2022-08-13 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3100,'2022-08-14 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3101,'2022-08-15 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3102,'2022-08-16 09:30:22.232051',7603);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (3103,'2022-08-17 09:30:22.232051',7603);
-- 경험치 획득 로그


INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3001,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3002,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3003,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3004,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3005,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3006,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3007,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3008,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3009,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3010,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3011,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3012,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3013,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3014,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3015,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3016,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3017,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3018,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3019,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3020,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3021,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3022,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3023,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3024,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3025,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3026,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3027,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3028,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3029,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3030,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3031,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3032,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3033,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3034,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3035,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3036,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3037,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3038,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3039,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3040,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3041,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3042,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3043,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3044,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3045,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3046,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3047,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3048,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3049,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3050,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3051,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3052,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3053,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3054,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3055,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3056,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3057,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3058,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3059,7603,4,7603,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3060,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3061,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3062,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3063,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3064,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3065,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3066,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3067,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3068,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3069,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3070,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3071,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3072,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3073,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3074,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3075,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3076,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3077,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3078,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3079,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3080,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3081,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3082,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3083,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3084,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3085,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3086,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3087,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3088,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3089,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3090,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3091,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3092,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3093,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3094,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3095,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3096,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3097,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3098,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3099,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3100,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3101,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3102,7603,4,7603,0);
--INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3103,7603,4,7603,0);

-- 게시글
--    -- 1. 게시글 작성
--
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1991,'2021-08-21 14:24:31.503768','안녕하세요! 영어 공부하려고 가입했습니다 ^_^',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4991,1991,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1992,'2021-08-21 15:24:31.503768','매칭은 어떻게 해요?',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4992,1992,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1993,'2021-08-22 14:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4993,1993,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1994,'2021-08-25 12:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4994,1994,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1995,'2021-08-26 14:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4995,1995,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1996,'2021-08-26 12:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4996,1996,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1997,'2021-08-26 13:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4997,1997,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1998,'2021-08-27 14:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4998,1998,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(1999,'2021-08-28 14:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4999,1999,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2000,'2021-08-29 12:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5000,2000,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2001,'2021-08-29 14:24:31.503768','영어 어려워 ㅠ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5001,2001,1,7603,0)

    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2002,'2021-09-03 14:24:31.503768','영어 너무 어려워요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5002,2002,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2003,'2021-09-03 14:24:31.503768','영어 너무 어려워요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5003,2003,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2004,'2021-09-05 12:24:31.503768','영어 너무 어려워요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5004,2004,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2005,'2021-09-05 14:24:31.503768','영어 너무 어려워요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5005,2005,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2006,'2021-09-07 14:24:31.503768','영어 너무 어려워요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5006,2006,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2007,'2021-09-08 14:24:31.503768','영어 너무 어려워요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5007,2007,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2008,'2021-09-13 14:24:31.503768','영어 너무 어려워요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5008,2008,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2009,'2021-09-15 14:24:31.503768','영어 너무 어려워요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5009,2009,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2010,'2021-09-26 14:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5010,2010,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2011,'2021-10-21 12:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5011,2011,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2012,'2021-10-21 14:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5012,2012,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2013,'2021-10-21 15:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5013,2013,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2014,'2021-11-11 14:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5014,2014,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2015,'2021-11-12 14:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5015,2015,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2016,'2021-11-13 14:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5016,2016,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2017,'2021-11-27 14:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5017,2017,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2018,'2021-12-18 14:24:31.503768','영어 공부 재밌어요',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5018,2018,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2019,'2022-01-21 14:24:31.503768','오늘 만난 영국 아저씨는 매우 친절했어요 Thank you sir :)',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5019,2019,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2020,'2022-01-22 14:24:31.503768','Somebody help me!!',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5020,2020,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2021,'2022-01-23 14:24:31.503768','Slow and steady win the race.  천천히 그리고 꾸준히 가는 자가 경주에서 승리한다.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5021,2021,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2022,'2022-01-25 12:24:31.503768','Heaven helps those who help themselves. 하늘은 스스로 돕는 자를 돕는다.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5022,2022,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2023,'2022-01-25 13:24:31.503768','오늘 만난 영국 아저씨는 매우 친절했어요 Thank you sir :)',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5023,2023,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2024,'2022-02-12 14:24:31.503768','Somebody help me!!',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5024,2024,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2025,'2022-03-03 14:24:31.503768',' A little learning is a dangerous thing.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5025,2025,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2026,'2022-03-04 14:24:31.503768','Only the educated are free.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5026,2026,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2027,'2022-05-21 14:24:31.503768','I have failed over and over again in my life. And that is why I succeed. 그리고 그것이 내가 성공한 이유이다.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5027,2027,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2028,'2022-05-23 14:24:31.503768','Nothing great was ever ahcieved without enthusiasm. 위대한 것 치고 열정 없이 이루어진 것은 없다.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5028,2028,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2029,'2022-06-21 14:24:31.503768','The chief thing is not learning, but the deed. 진정으로 중요한 것은 배우는 것이 아니라 실천하는 것이다.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5029,2029,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2030,'2022-06-22 14:24:31.503768','All our dreams can come true if we have the courage to pursue them.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5030,2030,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2031,'2022-07-21 14:24:31.503768',' Every failure is a stepping stone to success. 모든 실패는 성공으로 향하는 디딤돌이다.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5031,2031,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2032,'2022-07-23 14:24:31.503768','Somebody help me!!',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5032,2032,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2033,'2022-07-24 14:24:31.503768','오늘 만난 영국 아저씨는 매우 친절했어요 Thank you sir :)',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5033,2033,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2034,'2022-08-01 14:24:31.503768','Non but a wise man can employ leisure well. 오직 현명한 자만이 여가시간을 잘 활용한다.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5034,2034,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2035,'2022-08-14 14:24:31.503768',' Patience is bitter, but its fruit is sweet. 인내는 쓰나 그 열매는 달다.',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5035,2035,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2036,'2022-08-15 14:24:31.503768','영어 공부 힘들지만 youlangme 덕분에 너무 재밌어요!',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5036,2036,1,7603,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(2037,'2022-08-16 14:24:31.503768','Our patience will achieve more than our force. 우리의 인내는 우리의 힘보다 더 많은 것을 성취한다. ',7603);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5037,2037,1,7603,0)


---- ############## consultant123@test.com / ssafyA603 #####################
-- 기본 정보
INSERT INTO user VALUES(9322,'2022-04-20 09:30:22.232051','2022-04-20 16:30:22.232051','1992-02-02','hello!','consultant123@test.com','MALE',null,'ENGLISH','컨설턴트님','USA','{bcrypt}$2a$10$heQsbD189gKgMWS/cjI1aOspSkngIkXFDJppLo0mvA8JkOd/gTDY6','KOREAN');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (9322,'ROLE_USER');
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (9322,0,1,9322);
-- 관심사
INSERT INTO user_favorite VALUES(2004,'2022-08-20 09:30:22.232051','2022-08-20 09:30:22.232051',4,9322);
INSERT INTO user_favorite VALUES(2005,'2022-08-20 09:30:22.232051','2022-08-20 09:30:22.232051',5,9322);
INSERT INTO user_favorite VALUES(2006,'2022-08-20 09:30:22.232051','2022-08-20 09:30:22.232051',7,9322);

-- 출석
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4001,'2022-04-21 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4002,'2022-04-22 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4003,'2022-04-23 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4004,'2022-04-24 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4005,'2022-04-25 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4006,'2022-04-26 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4007,'2022-04-27 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4008,'2022-04-28 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4009,'2022-04-29 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4010,'2022-05-11 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4011,'2022-05-21 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4012,'2022-05-22 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4013,'2022-05-23 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4014,'2022-05-25 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4015,'2022-05-26 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4016,'2022-05-28 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4017,'2022-05-29 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4018,'2022-05-30 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4019,'2022-06-02 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4020,'2022-06-03 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4021,'2022-06-05 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4022,'2022-06-09 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4023,'2022-06-11 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4024,'2022-06-12 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4025,'2022-06-13 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4026,'2022-07-14 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4027,'2022-07-15 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4028,'2022-07-16 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4029,'2022-08-06 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4030,'2022-08-12 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4031,'2022-08-14 09:30:22.232051',9322);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (4032,'2022-08-15 09:30:22.232051',9322);

-- 출석 경험치
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5201,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5202,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5203,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5204,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5205,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5206,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5207,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5208,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5209,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5210,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5211,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5212,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5213,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5214,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5215,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5216,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5217,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5218,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5219,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5220,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5221,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5222,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5223,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5224,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5225,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5226,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5227,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5228,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5229,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5230,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5231,9322,4,9322,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5232,9322,4,9322,0);

-- 게시글
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3001,'2022-04-23 14:24:31.503768','Somebody help me!!',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6002,3001,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3002,'2022-04-24 14:24:31.503768','오늘 만난 한국 청년은 매우 친절했어요 Thank you :)',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6003,3002,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3003,'2022-05-01 14:24:31.503768','Non but a wise man can employ leisure well. 오직 현명한 자만이 여가시간을 잘 활용한다.',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6004,3003,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3004,'2022-05-14 14:24:31.503768',' Patience is bitter, but its fruit is sweet. 인내는 쓰나 그 열매는 달다.',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6005,3004,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3005,'2022-05-15 14:24:31.503768','한국어 공부 힘들지만 youlangme 덕분에 너무 재밌어요! so fun!!',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6006,3005,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3006,'2022-06-16 14:24:31.503768','Our patience will achieve more than our force. 우리의 인내는 우리의 힘보다 더 많은 것을 성취한다. ',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6007,3006,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3007,'2022-07-01 14:24:31.503768','Non but a wise man can employ leisure well. 오직 현명한 자만이 여가시간을 잘 활용한다.',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6008,3007,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3008,'2022-07-02 14:24:31.503768',' Patience is bitter, but its fruit is sweet. 인내는 쓰나 그 열매는 달다.',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6009,3008,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3009,'2022-07-04 14:24:31.503768','한국어 배운지 3개월입니다. 즐거워요',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6010,3009,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3010,'2022-07-16 14:24:31.503768','Our patience will achieve more than our force. 우리의 인내는 우리의 힘보다 더 많은 것을 성취한다. ',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6011,3010,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3011,'2022-07-28 14:24:31.503768','Non but a wise man can employ leisure well. 오직 현명한 자만이 여가시간을 잘 활용한다.',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6012,3011,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3012,'2022-07-29 14:24:31.503768',' 꿩 먹고 알 먹는다  Meaning: Kill two birds with one stone',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6013,3012,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3013,'2022-08-09 14:24:31.503768','한국어 공부 힘들지만 youlangme 덕분에 너무 재밌어요!',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6014,3013,1,9322,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(3014,'2022-08-17 14:24:31.503768','오늘 배운 재밌는 한국 속담: 낮말은 새가 듣고 밤말은 쥐가 듣는다 (nanmareun saega deutgo bammareun jwiga deunneunda) Meaning: The walls have ears.  Literal Translation: Birds hear the words spoken in the day, and mice hear the words spoken at night',9322);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6015,3014,1,9322,0)



---- ############## coach123@test.com / ssafyA603 #####################
-- 기본 정보
INSERT INTO user VALUES(9777,'2022-04-20 09:30:22.232051','2022-04-20 16:30:22.232051','1997-08-12','hello!','coach123@test.com','FEMALE',null,'ENGLISH','코치님','USA','{bcrypt}$2a$10$heQsbD189gKgMWS/cjI1aOspSkngIkXFDJppLo0mvA8JkOd/gTDY6','KOREAN');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (9777,'ROLE_USER');
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (9777,0,1,9777);
-- 관심사
INSERT INTO user_favorite VALUES(2007,'2022-08-20 09:30:22.232051','2022-08-20 09:30:22.232051',4,9777);
INSERT INTO user_favorite VALUES(2008,'2022-08-20 09:30:22.232051','2022-08-20 09:30:22.232051',5,9777);
INSERT INTO user_favorite VALUES(2009,'2022-08-20 09:30:22.232051','2022-08-20 09:30:22.232051',8,9777);

-- 출석
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5001,'2022-05-01 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5002,'2022-05-02 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5003,'2022-05-03 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5004,'2022-05-04 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5005,'2022-05-05 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5006,'2022-05-06 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5007,'2022-05-07 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5008,'2022-05-08 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5009,'2022-05-09 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5010,'2022-05-10 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5011,'2022-05-11 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5012,'2022-05-12 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5013,'2022-05-13 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5014,'2022-05-14 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5015,'2022-05-15 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5016,'2022-05-16 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5017,'2022-05-17 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5018,'2022-05-18 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5019,'2022-05-19 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5020,'2022-05-20 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5021,'2022-07-12 09:30:22.232051',9777);
INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (5022,'2022-08-05 09:30:22.232051',9777);

-- 출석 경험치
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6201,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6202,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6203,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6204,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6205,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6206,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6207,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6208,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6209,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6210,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6211,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6212,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6213,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6214,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6215,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6216,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6217,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6218,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6219,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6220,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6221,9777,4,9777,0);
INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6222,9777,4,9777,0);

-- 게시글
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(4001,'2022-04-23 14:24:31.503768','Hello world!',9777);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (7002,4001,1,9777,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(4002,'2022-06-24 14:24:31.503768','오늘 만난 한국 친구 매우 재밌었어요! Thank you :)',9777);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (7003,4002,1,9777,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(4003,'2022-06-29 14:24:31.503768','Non but a wise man can employ leisure well. 오직 현명한 자만이 여가시간을 잘 활용한다.',9777);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (7004,4003,1,9777,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(4004,'2022-07-14 14:24:31.503768',' Patience is bitter, but its fruit is sweet. 인내는 쓰나 그 열매는 달다.',9777);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (7005,4004,1,9777,0)
    INSERT INTO board(`id`,`created_time`,`contents`,`author_id`) VALUES(4005,'2022-08-15 14:24:31.503768','youlangme 덕분에 한국어 공부가 너무 재밌어요! so fun :)',9777);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (7006,4005,1,9777,0)


-- ### 댓글 ###

    -- 발표 아이디가 작성한 글에 달린 댓글
    -- 컨설턴트님 댓글
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (2001,'2022-05-21 14:36:30.397647','That is a good phrase',0,2027,9322)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (10001,'2022-05-21 14:36:30.399644',2001,2,9322,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (2002,'2022-07-23 14:36:30.397647','What is the matter?',0,2032,9322)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (10002,'2022-07-23 14:36:30.399644',2002,2,9322,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (2003,'2022-08-15 14:36:30.397647','I think so, too!',0,2036,9322)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (10003,'2022-08-15 14:36:30.399644',2003,2,9322,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (2004,'2022-08-16 14:36:30.397647','What a great article!',0,2037,9322)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (10004,'2022-08-16 14:36:30.399644',2004,2,9322,0)

    -- 컨설턴트님이 작성한 글에 달린 댓글
    -- 발표 아이디가 단 댓글
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (3001,'2022-04-23 14:36:30.397647','무슨 일이에요??',0,3001,7603)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (9101,'2022-04-23 14:36:30.399644',3001,2,7603,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (3002,'2022-05-14 14:36:30.397647','good!!',0,3004,9322)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (9102,'2022-05-14 14:36:30.399644',3002,2,7603,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (3003,'2022-07-16 14:36:30.397647','I think so, too!',0,3010,9322)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (9103,'2022-07-16 14:36:30.399644',3003,2,7603,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (3004,'2022-07-29 14:36:30.397647','좋은 말이네요~',0,3012,7603)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (9104,'2022-07-29 14:36:30.399644',3004,2,7603,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (3005,'2022-08-09 14:36:30.397647','저도 그렇게 생각해요!',0,3013,7603)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (9105,'2022-08-09 14:36:30.399644',3005,2,7603,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (3006,'2022-08-17 14:36:30.397647','한국어를 정말 잘하시는군요!^^',0,3014,7603)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (9106,'2022-08-17 14:36:30.399644',3006,2,7603,0)

    -- 코치님 댓글
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (4001,'2022-05-22 14:36:30.397647','nice',0,2027,9777)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (10101,'2022-05-21 14:36:30.399644',4001,2,9777,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (4002,'2022-07-24 14:36:30.397647','May I help you?',0,2032,9777)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (10102,'2022-07-23 14:36:30.399644',4002,2,9777,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (4003,'2022-08-15 15:36:30.397647','Good Job!',0,2036,9777)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (10103,'2022-08-15 15:36:30.399644',4003,2,9777,0)
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (4004,'2022-08-16 15:36:30.397647','It is the best post I have seen recently',0,2037,9777)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (10104,'2022-08-16 15:36:30.399644',4004,2,9777,0)


    -- 코치님 글에 달린 댓글
    -- 발표 아이디가 단 댓글
    INSERT INTO reply (`id`,`created_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (5001,'2022-08-15 14:36:30.397647','저도 그래요^^',0,4005,7603)
    INSERT INTO exp_acquisition_log(`id`,`created_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (12001,'2022-08-15 14:36:30.399644',5001,2,7603,0)


-- #### 미팅 로그 ####
    -- session   발표자 & 컨설턴트님 (10분)
    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10001,'2022-08-01 12:21:22.232051','OPEN','testsessionabcdefgi7a603testsessionid1');
    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10002,'2022-08-01 12:31:32.232051','CLOSE','testsessionabcdefgi7a603testsessionid1',10001);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20001,'2022-08-01 12:21:22.232051','START','ENGLISH',10001,7603);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20002,'2022-08-01 12:21:22.232051','START','KOREAN',10001,9322);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20003,'2022-08-01 12:31:32.232051','END','ENGLISH',10002,7603);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20004,'2022-08-01 12:31:32.232051','END','KOREAN',10002,9322);
    -- 경험치 획득 로그
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13001,10002,3,7603,10);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13002,10002,3,9322,10);

    -- session   발표자 & 코치님 (14분)
    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10003,'2022-08-03 12:21:22.232051','OPEN','testsessionabcdefgi7a603testsessionid2');
    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10004,'2022-08-03 12:35:32.232051','CLOSE','testsessionabcdefgi7a603testsessionid2',10003);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20005,'2022-08-03 12:21:22.232051','START','ENGLISH',10003,7603);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20006,'2022-08-03 12:21:22.232051','START','KOREAN',10003,9777);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20007,'2022-08-03 12:35:32.232051','END','ENGLISH',10004,7603);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20008,'2022-08-03 12:35:32.232051','END','KOREAN',10004,9777);
    -- 경험치 획득 로그
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13003,10004,3,7603,14);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13004,10004,3,9777,14);

    -- session   발표자 & 컨설턴트님 (6분)
    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10005,'2022-08-10 12:21:22.232051','OPEN','testsessionabcdefgi7a603testsessionid3');
    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10006,'2022-08-10 12:27:32.232051','CLOSE','testsessionabcdefgi7a603testsessionid3',10005);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20009,'2022-08-10 12:21:22.232051','START','ENGLISH',10005,7603);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20010,'2022-08-10 12:21:22.232051','START','KOREAN',10005,9322);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20011,'2022-08-10 12:27:32.232051','END','ENGLISH',10006,7603);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20012,'2022-08-10 12:27:32.232051','END','KOREAN',10006,9322);
    -- 경험치 획득 로그
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13005,10006,3,7603,6);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13006,10006,3,9322,6);

     -- session   발표자 & 컨설턴트님 (7분) (스페인어 vs 중국어)
     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10007,'2022-08-14 14:21:22.232051','OPEN','testsessionabcdefgi7a603testsessionid4');
     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10008,'2022-08-14 14:28:32.232051','CLOSE','testsessionabcdefgi7a603testsessionid4',10007);
     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20013,'2022-08-14 14:21:22.232051','START','SPANISH',10007,7603);
     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20014,'2022-08-14 14:21:22.232051','START','CHINESE',10007,9322);
     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20015,'2022-08-14 14:28:32.232051','END','SPANISH',10008,7603);
     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20016,'2022-08-14 14:28:32.232051','END','CHINESE',10008,9322);
     -- 경험치 획득 로그
     INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13007,10008,3,7603,7);
     INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13008,10008,3,9322,7);

    -- session   발표자 & 코치님 (5분) (일본어 vs 중국어)
    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10009,'2022-08-17 12:21:22.232051','OPEN','testsessionabcdefgi7a603testsessionid5');
    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10010,'2022-08-17 12:26:32.232051','CLOSE','testsessionabcdefgi7a603testsessionid5',10009);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20017,'2022-08-17 12:21:22.232051','START','JAPANESE',10009,7603);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20018,'2022-08-17 12:21:22.232051','START','CHINESE',10009,9777);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20019,'2022-08-17 12:26:32.232051','END','JAPANESE',10010,7603);
    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20020,'2022-08-17 12:26:32.232051','END','CHINESE',10010,9777);
    -- 경험치 획득 로그
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13009,10010,3,7603,5);
    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (13010,10010,3,9777,5);

--- ### 시연용 더미 데이터 셋 end ###



--
--
---- User (비밀번호는 모두 1234)
--INSERT INTO user VALUES(1001,'2022-07-20 09:30:22.232051','2022-07-21 16:30:22.232051','1999-07-02','hello!','userbot1@gmail.com','MALE',null,'KOREAN','userbot1','KOREA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(1002,'2022-07-18 16:31:22.232051','2022-07-21 16:30:22.232051','1994-04-30','hello?','userbot2@gmail.com','FEMALE',null,'KOREAN','userbot2','KOREA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','JAPANESE');
--INSERT INTO user VALUES(1003,'2022-07-21 16:32:22.232051','2022-07-21 16:30:22.232051','1995-03-21','hello...','userbot3@gmail.com','FEMALE',null,'CHINESE','userbot3','CHINA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(1004,'2022-07-21 12:33:22.232051','2022-07-21 16:30:22.232051','2001-02-13','hello!!','userbot4@gmail.com','MALE',null,'ENGLISH','userbot4','USA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','KOREAN');
--INSERT INTO user VALUES(1005,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','userbot5@gmail.com','FEMALE',null,'JAPANESE','userbot5','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(1006,'2022-07-23 13:21:42.738291','2022-07-23 13:21:42.738291','1998-01-28','hello hello','userbot6@gmail.com','MALE',null,'SPANISH','userbot6','SPAIN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','CHINESE');
--
--INSERT INTO user VALUES(2001,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','2001@gmail.com','MALE',null,'JAPANESE','userbot2001','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(2002,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','2002@gmail.com','MALE',null,'JAPANESE','userbot2002','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(2003,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','2003@gmail.com','MALE',null,'JAPANESE','userbot2003','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(2004,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','2004@gmail.com','MALE',null,'JAPANESE','userbot2004','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(2005,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','2005@gmail.com','MALE',null,'JAPANESE','userbot2005','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(2006,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','2006@gmail.com','MALE',null,'JAPANESE','userbot2006','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(2007,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','2007@gmail.com','MALE',null,'JAPANESE','userbot2007','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--INSERT INTO user VALUES(2008,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','2008@gmail.com','MALE',null,'JAPANESE','userbot2008','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
--
---- url.server.mathcing = http://172.17.0.4:8000

--
--
---- User Roles
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (1001,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (1002,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (1003,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (1004,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (1005,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (1006,'ROLE_USER');
--
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (2001,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (2002,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (2003,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (2004,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (2005,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (2006,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (2007,'ROLE_USER');
--INSERT INTO user_roles(`user_id`,`roles`) VALUES (2008,'ROLE_USER');
--
--
---- User Exp (유저별 경험치 테이블 생성 및 초기화, 원래는 정상적인 루트로 회원 가입하면 자동으로 생성)
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1001,0,1,1001);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1002,0,1,1002);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1003,0,1,1003);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1004,0,1,1004);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1005,0,1,1005);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1006,0,1,1006);
--
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (2001,0,1,2001);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (2002,0,1,2002);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (2003,0,1,2003);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (2004,0,1,2004);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (2005,0,1,2005);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (2006,0,1,2006);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (2007,0,1,2007);
--INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (2008,0,1,2008);
--
---- 경험치 획득 활동 (1001,1002 만)
--
--    -- 1. 게시글 작성
--
--    INSERT INTO board(`id`,`created_time`,`modified_time`,`contents`,`author_id`) VALUES(1,'2022-08-02 14:24:31.503768','2022-08-02 14:27:46.421367','Me many has an bananas <- 뭐가 틀린건가요???',1001);
--    INSERT INTO board(`id`,`created_time`,`modified_time`,`contents`,`author_id`) VALUES(2,'2022-08-02 14:25:12.028512','2022-08-02 14:25:12.028512','I want to study english!',1001);
--    INSERT INTO board(`id`,`created_time`,`modified_time`,`contents`,`author_id`) VALUES(3,'2022-08-02 14:25:39.285407','2022-08-02 14:25:39.285407','안녕하세요 영어 배우고 싶어요 ^_^',1001);
--    INSERT INTO board(`id`,`created_time`,`modified_time`,`contents`,`author_id`) VALUES(4,'2022-08-02 14:31:42.123136','2022-08-02 14:31:42.123136','일본어 배우고 싶어서 가입했습니다!!!',1002);
--    -- 2. 댓글 작성
--    INSERT INTO reply (`id`,`created_time`,`modified_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (1,'2022-08-02 14:32:18.910127','2022-08-02 14:32:18.910127','다 틀렸어요',0,1,1002)
--    INSERT INTO reply (`id`,`created_time`,`modified_time`,`contents`,`pid`,`board_id`,`user_id`) VALUES (2,'2022-08-02 14:36:30.397647','2022-08-02 14:36:30.397647','반갑습니다 ^_^',0,4,1001)
--
--
---- 상기 경험치 획득 활동에 해당하는 로그들 (레벨, 경험치 조회 시 아래 로그를 바탕으로 경험치를 계산해서 userExp 테이블이 갱신된다.)
--    -- 1. 게시글 작성 로그
--    INSERT INTO exp_acquisition_log(`id`,`created_time`,`modified_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (1,'2022-08-02 14:24:31.527767','2022-08-02 14:24:31.527767',1,1,1001,0)
--    INSERT INTO exp_acquisition_log(`id`,`created_time`,`modified_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (2,'2022-08-02 14:25:12.031587','2022-08-02 14:25:12.031587',2,1,1001,0)
--    INSERT INTO exp_acquisition_log(`id`,`created_time`,`modified_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3,'2022-08-02 14:25:39.289487','2022-08-02 14:25:39.289487',3,1,1001,0)
--    INSERT INTO exp_acquisition_log(`id`,`created_time`,`modified_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (4,'2022-08-02 14:31:42.125134','2022-08-02 14:31:42.125134',4,1,1002,0)
--    -- 2. 댓글 작성 로그
--    INSERT INTO exp_acquisition_log(`id`,`created_time`,`modified_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (5,'2022-08-02 14:32:18.918093','2022-08-02 14:32:18.918093',1,2,1002,0)
--    INSERT INTO exp_acquisition_log(`id`,`created_time`,`modified_time`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (6,'2022-08-02 14:36:30.399644','2022-08-02 14:36:30.399644',2,2,1001,0)
--
--
---- User_Favorite
--INSERT INTO user_favorite VALUES(2001,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',2,1001);
--INSERT INTO user_favorite VALUES(2002,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',3,1001);
--INSERT INTO user_favorite VALUES(2003,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',4,1001);
--INSERT INTO user_favorite VALUES(2004,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',10,1002);
--INSERT INTO user_favorite VALUES(2005,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',12,1003);
--INSERT INTO user_favorite VALUES(2006,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',10,1003);
--INSERT INTO user_favorite VALUES(2007,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',7,1004);
--INSERT INTO user_favorite VALUES(2008,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',9,1005);
--
--INSERT INTO user_favorite VALUES(2009,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1,2001);
--INSERT INTO user_favorite VALUES(2010,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',4,2001);
--INSERT INTO user_favorite VALUES(2011,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',2,2002);
--INSERT INTO user_favorite VALUES(2012,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',3,2002);
--INSERT INTO user_favorite VALUES(2013,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',4,2002);
--INSERT INTO user_favorite VALUES(2014,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',5,2003);
--INSERT INTO user_favorite VALUES(2015,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',2,2004);
--INSERT INTO user_favorite VALUES(2016,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',3,2004);
--INSERT INTO user_favorite VALUES(2017,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1,2005);
--INSERT INTO user_favorite VALUES(2018,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',5,2005);
--INSERT INTO user_favorite VALUES(2019,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1,2006);
--INSERT INTO user_favorite VALUES(2020,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',6,2006);
--INSERT INTO user_favorite VALUES(2021,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',7,2006);
--INSERT INTO user_favorite VALUES(2022,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',13,2007);
--INSERT INTO user_favorite VALUES(2023,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1,2008);
--INSERT INTO user_favorite VALUES(2024,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',2,2008);
--
--
---- Follow (userbot1(1001) 위주)
--INSERT INTO follow VALUES(3001,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1005);
--INSERT INTO follow VALUES(3002,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1004);
--INSERT INTO follow VALUES(3003,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1003);
--INSERT INTO follow VALUES(3004,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1002);
--INSERT INTO follow VALUES(3005,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1002,1001);
--INSERT INTO follow VALUES(3006,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1004,1001);
--INSERT INTO follow VALUES(3007,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1005,1001);
--
--
--
---- ### Meeting Log ###
--
---- ChatRoomLog (userbot1 위주, userbot6은 어뷰징 유저, 대화 시간이 짧다.)
--    -- session   userbot1 & userbot3 (9분 30초)
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10001,'2022-08-01 12:21:22.232051','OPEN','testsessionabcdefgi7a603testsessionid1');
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10002,'2022-08-01 12:30:52.232051','CLOSE','testsessionabcdefgi7a603testsessionid1',10001);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20001,'2022-08-01 12:21:22.232051','START','ENGLISH',10001,1003);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20002,'2022-08-01 12:21:22.232051','START','KOREAN',10001,1001);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20003,'2022-08-01 12:30:52.232051','END','ENGLISH',10002,1003);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20004,'2022-08-01 12:30:52.232051','END','KOREAN',10002,1001);
--    -- 경험치 획득 로그
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3001,10002,3,1001,9);
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3002,10002,3,1003,9);
--
--    -- session   userbot1 & userbot4 (12분)
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10003,'2022-08-02 14:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid2');
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10004,'2022-08-02 14:42:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid2',10003);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20005,'2022-08-02 14:30:22.232051','START','ENGLISH',10003,1004);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20006,'2022-08-02 14:30:22.232051','START','KOREAN',10003,1001);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20007,'2022-08-02 14:42:22.232051','END','ENGLISH',10004,1004);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20008,'2022-08-02 14:42:22.232051','END','KOREAN',10004,1001);
--    -- 경험치 획득 로그
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3003,10004,3,1001,12);
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3004,10004,3,1004,12);
--
--    -- session   userbot2 & userbot5 (8분 10초)
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10005,'2022-08-02 14:31:22.232051','OPEN','testsessionabcdefgi7a603testsessionid3');
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10006,'2022-08-02 14:39:32.232051','CLOSE','testsessionabcdefgi7a603testsessionid3',10005);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20009,'2022-08-02 14:31:22.232051','START','CHINESE',10005,1005);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20010,'2022-08-02 14:31:22.232051','START','KOREAN',10005,1002);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20011,'2022-08-02 14:39:32.232051','END','CHINESE',10006,1005);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20012,'2022-08-02 14:39:32.232051','END','KOREAN',10006,1002);
--    -- 경험치 획득 로그
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3005,10006,3,1002,8);
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3006,10006,3,1005,8);
--
--    -- session   userbot4 & userbot6 (1분 30초)
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10007,'2022-08-03 09:31:22.232051','OPEN','testsessionabcdefgi7a603testsessionid4');
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10008,'2022-08-03 09:32:52.232051','CLOSE','testsessionabcdefgi7a603testsessionid4',10007);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20013,'2022-08-03 09:31:22.232051','START','SPANISH',10007,1006);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20014,'2022-08-03 09:31:22.232051','START','ENGLISH',10007,1004);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20015,'2022-08-03 09:32:52.232051','END','SPANISH',10008,1006);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20016,'2022-08-03 09:32:52.232051','END','ENGLISH',10008,1004);
--    -- 경험치 획득 로그
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3007,10008,3,1004,1);
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3008,10008,3,1006,1);
--
--    -- session   userbot5 & userbot6 (2분)
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10009,'2022-08-03 09:35:22.232051','OPEN','testsessionabcdefgi7a603testsessionid5');
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10010,'2022-08-03 09:37:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid5',10009);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20017,'2022-08-03 09:35:22.232051','START','ENGLISH',10009,1006);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20018,'2022-08-03 09:35:22.232051','START','JAPANESE',10009,1005);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20019,'2022-08-03 09:37:22.232051','END','ENGLISH',10010,1006);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20020,'2022-08-03 09:37:22.232051','END','JAPANESE',10010,1005);
--    -- 경험치 획득 로그
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3009,10010,3,1005,2);
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3010,10010,3,1006,2);
--
--    -- session   userbot1 & userbot2 (35분 20초)
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10011,'2022-08-05 12:00:22.232051','OPEN','testsessionabcdefgi7a603testsessionid6');
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10012,'2022-08-05 12:35:42.232051','CLOSE','testsessionabcdefgi7a603testsessionid6',10011);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20021,'2022-08-05 12:00:22.232051','START','ENGLISH',10011,1002);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20022,'2022-08-05 12:00:22.232051','START','KOREAN',10011,1001);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20023,'2022-08-05 12:35:42.232051','END','ENGLISH',10012,1002);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20024,'2022-08-05 12:35:42.232051','END','KOREAN',10012,1001);
--    -- 경험치 획득 로그
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3011,10012,3,1001,35);
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3012,10012,3,1002,35);
--
--    -- session   userbot1 & userbot2 (22분)
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10013,'2022-08-07 14:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid7');
--    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`,`open_log_id`) VALUES (10014,'2022-08-07 14:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid7',10013);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20025,'2022-08-07 14:30:22.232051','START','ENGLISH',10013,1002);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20026,'2022-08-07 14:30:22.232051','START','KOREAN',10013,1001);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20027,'2022-08-07 14:52:22.232051','END','ENGLISH',10014,1002);
--    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20028,'2022-08-07 14:52:22.232051','END','KOREAN',10014,1001);
--    -- 경험치 획득 로그
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3013,10014,3,1001,22);
--    INSERT INTO exp_acquisition_log(`id`,`target_id`,`activity_id`,`user_id`,`multi_base`) VALUES (3014,10014,3,1002,22);
--
---- 출석 로그
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1234,'2022-08-01 14:30:22.232051',1001);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1235,'2022-08-02 14:35:22.232051',1001);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1236,'2022-08-04 14:33:22.232051',1001);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1237,'2022-08-07 14:31:22.232051',1001);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1238,'2022-08-10 14:32:22.232051',1001);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1239,'2022-04-01 14:30:22.232051',1002);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1240,'2022-08-14 14:30:22.232051',1002);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1241,'2022-08-08 14:30:22.232051',1003);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1242,'2022-08-07 14:30:22.232051',1004);
--INSERT INTO attendance_log (`id`,`created_time`,`user_id`) VALUES (1243,'2022-08-03 14:30:22.232051',1005);
--
--
----    1월 달 부터 8월 까지 잔디밭 테스트
--    -- session   userbot1 & userbot2 (20분)
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10015,'2022-07-07 14:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid8');
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10016,'2022-07-07 14:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid8');
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20029,'2022-07-07 14:30:22.232051','START','ENGLISH',10015,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20030,'2022-07-07 14:30:22.232051','START','KOREAN',10015,1001);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20031,'2022-07-07 14:52:22.232051','END','ENGLISH',10016,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20032,'2022-07-07 14:52:22.232051','END','KOREAN',10016,1001);
----
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10017,'2022-06-07 14:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid9');
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10018,'2022-06-07 14:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid9');
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20033,'2022-06-07 14:30:22.232051','START','ENGLISH',10017,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20034,'2022-06-07 14:30:22.232051','START','KOREAN',10017,1001);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20035,'2022-06-07 14:52:22.232051','END','ENGLISH',10018,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20036,'2022-06-07 14:52:22.232051','END','KOREAN',10018,1001);
----
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10019,'2022-05-07 14:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid10');
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10020,'2022-05-07 14:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid10');
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20037,'2022-05-07 14:30:22.232051','START','ENGLISH',10019,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20038,'2022-05-07 14:30:22.232051','START','KOREAN',10019,1001);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20039,'2022-05-07 14:52:22.232051','END','ENGLISH',10020,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20040,'2022-05-07 14:52:22.232051','END','KOREAN',10020,1001);
----
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10021,'2022-04-07 14:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid11');
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10022,'2022-04-07 14:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid11');
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20041,'2022-04-07 14:30:22.232051','START','ENGLISH',10021,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20042,'2022-04-07 14:30:22.232051','START','KOREAN',10021,1001);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20043,'2022-04-07 14:52:22.232051','END','ENGLISH',10022,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20044,'2022-04-07 14:52:22.232051','END','KOREAN',10022,1001);
----
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10023,'2022-03-07 14:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid12');
----    INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10024,'2022-03-07 14:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid12');
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20045,'2022-03-07 14:30:22.232051','START','ENGLISH',10023,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20046,'2022-03-07 14:30:22.232051','START','KOREAN',10023,1001);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20047,'2022-03-07 14:52:22.232051','END','ENGLISH',10024,1002);
----    INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20048,'2022-03-07 14:52:22.232051','END','KOREAN',10024,1001);
----
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10025,'2022-02-07 14:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid13');
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10026,'2022-02-07 14:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid13');
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20049,'2022-02-07 14:30:22.232051','START','ENGLISH',10025,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20050,'2022-02-07 14:30:22.232051','START','KOREAN',10025,1001);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20051,'2022-02-07 14:52:22.232051','END','ENGLISH',10026,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20052,'2022-02-07 14:52:22.232051','END','KOREAN',10026,1001);
----
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10027,'2022-02-07 12:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid14');
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10028,'2022-02-07 12:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid14');
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20053,'2022-02-07 12:30:22.232051','START','ENGLISH',10027,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20054,'2022-02-07 12:30:22.232051','START','KOREAN',10027,1001);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20055,'2022-02-07 12:52:22.232051','END','ENGLISH',10028,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20056,'2022-02-07 12:52:22.232051','END','KOREAN',10028,1001);
----
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10029,'2022-02-07 13:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid15');
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10030,'2022-02-07 13:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid15');
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20057,'2022-02-07 13:30:22.232051','START','ENGLISH',10029,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20058,'2022-02-07 13:30:22.232051','START','KOREAN',10029,1001);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20059,'2022-02-07 13:52:22.232051','END','ENGLISH',10030,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20060,'2022-02-07 13:52:22.232051','END','KOREAN',10030,1001);
----
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10031,'2022-02-07 17:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid16');
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10032,'2022-02-07 17:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid16');
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20061,'2022-02-07 17:30:22.232051','START','ENGLISH',10031,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20062,'2022-02-07 17:30:22.232051','START','KOREAN',10031,1001);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20063,'2022-02-07 17:52:22.232051','END','ENGLISH',10032,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20064,'2022-02-07 17:52:22.232051','END','KOREAN',10032,1001);
----
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10033,'2022-02-07 18:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid17');
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10034,'2022-02-07 18:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid17');
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20065,'2022-02-07 18:30:22.232051','START','ENGLISH',10033,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20066,'2022-02-07 18:30:22.232051','START','KOREAN',10033,1001);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20067,'2022-02-07 18:52:22.232051','END','ENGLISH',10034,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20068,'2022-02-07 18:52:22.232051','END','KOREAN',10034,1001);
----
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10035,'2022-02-07 19:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid18');
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10036,'2022-02-07 19:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid18');
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20069,'2022-02-07 19:30:22.232051','START','ENGLISH',10035,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20070,'2022-02-07 19:30:22.232051','START','KOREAN',10035,1001);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20071,'2022-02-07 19:52:22.232051','END','ENGLISH',10036,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20072,'2022-02-07 19:52:22.232051','END','KOREAN',10036,1001);
----
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10037,'2022-02-07 20:30:22.232051','OPEN','testsessionabcdefgi7a603testsessionid19');
----     INSERT INTO chat_room_log (`id`,`created_time`,`log_type`,`session_id`) VALUES (10038,'2022-02-07 20:52:22.232051','CLOSE','testsessionabcdefgi7a603testsessionid19');
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20073,'2022-02-07 20:30:22.232051','START','ENGLISH',10037,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20074,'2022-02-07 20:30:22.232051','START','KOREAN',10037,1001);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20075,'2022-02-07 20:52:22.232051','END','ENGLISH',10038,1002);
----     INSERT INTO meeting_log (`id`,`created_time`,`log_type`,`your_language`,`chat_room_log_id`,`user_id`) VALUES (20076,'2022-02-07 20:52:22.232051','END','KOREAN',10038,1001);
--
--




