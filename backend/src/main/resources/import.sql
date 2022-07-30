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
INSERT INTO exp_activity(`id`,`exp`,`name`) VALUES (4,20,'ATTENDANCE');

-- 경험치별 레벨 데이터 테이블
INSERT INTO level (`id`, `level`, `min_exp`, `max_exp`) VALUES (1,1,0,49);
INSERT INTO level (`id`, `level`, `min_exp`, `max_exp`) VALUES (2,2,50,99);
INSERT INTO level (`id`, `level`, `min_exp`, `max_exp`) VALUES (3,3,100,199);
INSERT INTO level (`id`, `level`, `min_exp`, `max_exp`) VALUES (4,4,200,499);
INSERT INTO level (`id`, `level`, `min_exp`, `max_exp`) VALUES (5,5,500,999);
INSERT INTO level (`id`, `level`, `min_exp`, `max_exp`) VALUES (6,6,1000,1999);

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

-- User Exp
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (101,120,3,1001);
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (102,20,1,1002);
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (103,0,1,1003);
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (104,85,2,1004);
INSERT INTO user_exp(`id`,`exp`,`level_id`,`user_id`) VALUES (105,40,1,1005);


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

