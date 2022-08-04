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
INSERT INTO exp_activity(`id`,`exp`,`name`) VALUES (1,20,'WRITE_POST');
INSERT INTO exp_activity(`id`,`exp`,`name`) VALUES (2,5,'WRITE_REPLY');
INSERT INTO exp_activity(`id`,`exp`,`name`) VALUES (3,40,'MEETING');
INSERT INTO exp_activity(`id`,`exp`,`name`) VALUES (4,10,'ATTENDANCE');

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


-- User
INSERT INTO user VALUES(1001,'2022-07-20 09:30:22.232051','2022-07-21 16:30:22.232051','1999-07-02','hello!','userbot1@gmail.com','MALE',null,'KOREAN','userbot1','KOREA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
INSERT INTO user VALUES(1002,'2022-07-18 16:31:22.232051','2022-07-21 16:30:22.232051','1994-04-30','hello?','userbot2@gmail.com','FEMALE',null,'KOREAN','userbot2','KOREA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','JAPANESE');
INSERT INTO user VALUES(1003,'2022-07-21 16:32:22.232051','2022-07-21 16:30:22.232051','1995-03-21','hello...','userbot3@gmail.com','FEMALE',null,'CHINESE','userbot3','CHINA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
INSERT INTO user VALUES(1004,'2022-07-21 12:33:22.232051','2022-07-21 16:30:22.232051','2001-02-13','hello!!','userbot4@gmail.com','MALE',null,'ENGLISH','userbot4','USA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','KOREAN');
INSERT INTO user VALUES(1005,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051','1997-11-02','hello!!!','userbot5@gmail.com','FEMALE',null,'JAPANESE','userbot5','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');


-- User Roles
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1001,'ROLE_USER');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1002,'ROLE_USER');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1003,'ROLE_USER');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1004,'ROLE_USER');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1005,'ROLE_USER');


-- User Exp (유저별 경험치 테이블 생성 및 초기화, 원래는 정상적인 루트로 회원 가입하면 자동으로 생성)
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1001,0,1,1001);
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1002,0,1,1002);
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1003,0,1,1003);
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1004,0,1,1004);
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (1005,0,1,1005);

-- 경험치 획득 활동 (1001,1002 만)

    -- 1. 게시글 작성

    INSERT INTO board(`id`,`created_date`,`modified_date`,`contents`,`author_id`) VALUES(1,'2022-08-02 14:24:31.503768','2022-08-02 14:27:46.421367','Me many has an bananas <- 뭐가 틀린건가요???',1001);
    INSERT INTO board(`id`,`created_date`,`modified_date`,`contents`,`author_id`) VALUES(2,'2022-08-02 14:25:12.028512','2022-08-02 14:25:12.028512','I want to study english!',1001);
    INSERT INTO board(`id`,`created_date`,`modified_date`,`contents`,`author_id`) VALUES(3,'2022-08-02 14:25:39.285407','2022-08-02 14:25:39.285407','안녕하세요 영어 배우고 싶어요 ^_^',1001);
    INSERT INTO board(`id`,`created_date`,`modified_date`,`contents`,`author_id`) VALUES(4,'2022-08-02 14:31:42.123136','2022-08-02 14:31:42.123136','일본어 배우고 싶어서 가입했습니다!!!',1002);
    -- 2. 댓글 작성
    INSERT INTO reply (`id`,`created_date`,`modified_date`,`contents`,`pid`,`board_id`,`user_id`) VALUES (1,'2022-08-02 14:32:18.910127','2022-08-02 14:32:18.910127','다 틀렸어요',0,1,1002)
    INSERT INTO reply (`id`,`created_date`,`modified_date`,`contents`,`pid`,`board_id`,`user_id`) VALUES (2,'2022-08-02 14:36:30.397647','2022-08-02 14:36:30.397647','반갑습니다 ^_^',0,4,1001)


-- 상기 경험치 획득 활동에 해당하는 로그들 (레벨, 경험치 조회 시 아래 로그를 바탕으로 경험치를 계산해서 userExp 테이블이 갱신된다.)
    -- 1. 게시글 작성 로그
    INSERT INTO exp_acquisition_log(`id`,`created_date`,`modified_date`,`target_id`,`activity_id`,`user_id`) VALUES (1,'2022-08-02 14:24:31.527767','2022-08-02 14:24:31.527767',1,1,1001)
    INSERT INTO exp_acquisition_log(`id`,`created_date`,`modified_date`,`target_id`,`activity_id`,`user_id`) VALUES (2,'2022-08-02 14:25:12.031587','2022-08-02 14:25:12.031587',2,1,1001)
    INSERT INTO exp_acquisition_log(`id`,`created_date`,`modified_date`,`target_id`,`activity_id`,`user_id`) VALUES (3,'2022-08-02 14:25:39.289487','2022-08-02 14:25:39.289487',3,1,1001)
    INSERT INTO exp_acquisition_log(`id`,`created_date`,`modified_date`,`target_id`,`activity_id`,`user_id`) VALUES (4,'2022-08-02 14:31:42.125134','2022-08-02 14:31:42.125134',4,1,1002)
    -- 2. 댓글 작성 로그
    INSERT INTO exp_acquisition_log(`id`,`created_date`,`modified_date`,`target_id`,`activity_id`,`user_id`) VALUES (5,'2022-08-02 14:32:18.918093','2022-08-02 14:32:18.918093',1,2,1002)
    INSERT INTO exp_acquisition_log(`id`,`created_date`,`modified_date`,`target_id`,`activity_id`,`user_id`) VALUES (6,'2022-08-02 14:36:30.399644','2022-08-02 14:36:30.399644',2,2,1001)


-- User_Favorite
INSERT INTO user_favorite VALUES(2001,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',2,1001);
INSERT INTO user_favorite VALUES(2002,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',3,1001);
INSERT INTO user_favorite VALUES(2003,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',4,1001);
INSERT INTO user_favorite VALUES(2004,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',10,1002);
INSERT INTO user_favorite VALUES(2005,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',12,1003);
INSERT INTO user_favorite VALUES(2006,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',10,1003);
INSERT INTO user_favorite VALUES(2007,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',7,1004);
INSERT INTO user_favorite VALUES(2008,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',9,1005);


-- Follow (userbot1(1001) 위주)
INSERT INTO follow VALUES(3001,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1005);
INSERT INTO follow VALUES(3002,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1004);
INSERT INTO follow VALUES(3003,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1003);
INSERT INTO follow VALUES(3004,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1002);
INSERT INTO follow VALUES(3005,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1002,1001);
INSERT INTO follow VALUES(3006,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1004,1001);
INSERT INTO follow VALUES(3007,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1005,1001);


--Userlog 테이블 임의 저장 --
INSERT INTO user_log VALUES(1,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',20,'men','ENFP','korea','korean',1001,'English');
INSERT INTO user_log VALUES(2,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',22,'women','ENFP','korea','chinese',1001,'English');
INSERT INTO user_log VALUES(3,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',24,'men','ENFP','korea','japanese',1001,'korean');
INSERT INTO user_log VALUES(4,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',26,'women','ENFP','korea','korean',1001,'france');
INSERT INTO user_log VALUES(5,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',28,'men','ENFP','korea','English',1001,'korean');
INSERT INTO user_log VALUES(6,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',30,'women','ENFP','korea','korean',1001,'chinese');
INSERT INTO user_log VALUES(7,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',20,'men','ENFP','korea','korean',1001,'English');
INSERT INTO user_log VALUES(8,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',22,'women','ENFP','korea','chinese',1001,'English');
INSERT INTO user_log VALUES(9,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',24,'men','ENFP','korea','japanese',1001,'korean');
INSERT INTO user_log VALUES(10,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',26,'women','ENFP','korea','korean',1001,'france');

