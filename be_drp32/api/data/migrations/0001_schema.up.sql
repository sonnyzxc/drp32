CREATE TABLE IF NOT EXISTS families (
  family_id BIGSERIAL PRIMARY KEY,
  family_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY,
    user_email TEXT UNIQUE NOT NULL,
    user_name TEXT NOT NULL,
    family_id BIGINT NOT NULL,
    FOREIGN KEY ( family_id ) REFERENCES families ( family_id )

);

CREATE TABLE IF NOT EXISTS chores (
  chore_id BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  points INT NOT NULL,
  completed BOOLEAN NOT NULL,
  assigned_to BIGINT NOT NULL,
  due_date DATE NOT NULL,
  FOREIGN KEY ( assigned_to ) REFERENCES users ( user_id )
);

CREATE TABLE IF NOT EXISTS rewards (
  reward_id BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  points INT NOT NULL
);

CREATE TABLE IF NOT EXISTS redeemed (
  reward_id BIGINT,
  user_id BIGINT,
  PRIMARY KEY ( reward_id, user_id ),
  FOREIGN KEY ( reward_id ) REFERENCES rewards ( reward_id ),
  FOREIGN KEY ( user_id ) REFERENCES users ( user_id )
);