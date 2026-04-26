DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
  id bigserial PRIMARY KEY,
  account_id varchar(20) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  name varchar(20) NOT NULL,
  phone_number varchar(20) NOT NULL,
  email varchar(255) NOT NULL,
  role_type varchar(10) NOT NULL CHECK (role_type IN ('ADMIN', 'SELLER', 'USER')),
  profile_image varchar(255) NULL,
  profile_name varchar(20) NOT NULL,
  profile_text varchar(100) NULL,
  gender varchar(1) NULL,
  birthday date NULL,
  preference_types varchar(255) NULL,
  created_at timestamp NOT NULL,
  created_by varchar(20) NOT NULL,
  modified_at timestamp NOT NULL,
  modified_by varchar(20) NOT NULL,
  deleted_at timestamp NULL
);

-- 테스트 계정 (password: test1234)
INSERT INTO user_account
  (account_id, password, name, phone_number, email, role_type, profile_image, profile_name, profile_text, gender, birthday, preference_types, created_at, created_by, modified_at, modified_by, deleted_at)
VALUES
  ('user1', '$2b$10$tps.3lyFY2abAaeEjiBL0.0pMNu4nscEeL20lTJUb1h9KthmZcNOK', '테스트유저', '01056785678', 'user1@test.com', 'USER', NULL, '여행자', '안녕하세요!', 'M', '1995-06-15', NULL, NOW(), 'system', NOW(), 'system', NULL);