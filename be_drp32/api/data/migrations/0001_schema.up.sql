CREATE TABLE IF NOT EXISTS families (
  family_id BIGSERIAL PRIMARY KEY,
  family_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY,
    user_email TEXT UNIQUE NOT NULL,
    user_name TEXT NOT NULL,
    family_id BIGINT NOT NULL,
    admin BOOLEAN NOT NULL,
    FOREIGN KEY ( family_id ) REFERENCES families ( family_id )

);

CREATE TABLE IF NOT EXISTS chores (
  chore_id BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  emoji TEXT NOT NULL,
  points INT NOT NULL,
  completed BOOLEAN NOT NULL,
  assigned_to BIGINT,
  due_date DATE,
  time_completed DATE,
  img_dir TEXT,
  recurring INT NOT NULL,
  next BIGINT,
  FOREIGN KEY ( assigned_to ) REFERENCES users ( user_id )
);

-- insert into families (family_name) values ('McGinn');
-- insert into families (family_name) values ('Murr');
-- insert into families (family_name) values ('Corradini');
-- insert into families (family_name) values ('Hambidge');
-- insert into families (family_name) values ('Nobles');
-- insert into families (family_name) values ('Iapico');
-- insert into families (family_name) values ('Oxenham');
-- insert into families (family_name) values ('Yurocjkin');
-- insert into families (family_name) values ('Outhwaite');
-- insert into families (family_name) values ( 'Daldry');
--
-- insert into users ( user_email, user_name, family_id, admin) values ( 'jmadgwich0@europa.eu', 'Jimmie', 9, false);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'hhuggins1@fda.gov', 'Henrieta', 9, true);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'bheineke2@mlb.com', 'Bethena', 4, false);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'rwigelsworth3@freewebs.com', 'Rochelle', 6, true);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'vswinnerton4@slideshare.net', 'Valdemar', 4, false);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'clovejoy5@shop-pro.jp', 'Carlen', 3, true);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'gpawson6@bluehost.com', 'Gerrie', 7, false);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'iguildford7@creativecommons.org', 'Ilsa', 1, true);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'rstallon8@photobucket.com', 'Renee', 6, false);
-- insert into users ( user_email, user_name, family_id, admin) values ( 'csansam9@freewebs.com', 'Chilton', 4, true);
--
-- insert into chores (description, emoji, points, completed, assigned_to, due_date, recurring) values ('Geranium sylvaticum L.', 'test', 31, false, 6, '08/08/2024', 0);
-- insert into chores (description, emoji, points, completed, assigned_to, due_date, recurring) values ('Geranium sylvaticum L.', 'test', 31, true, 6, '08/08/2024', 0);
-- insert into chores (description, emoji, points, completed, assigned_to, due_date, recurring) values ('Geranium sylvaticum L.', 'test', 31, false, 4, '08/08/2024', 0);
