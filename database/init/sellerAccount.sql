DROP TABLE IF EXISTS seller_account;

CREATE TABLE seller_account (
  id bigserial PRIMARY KEY,
  account_id varchar(20) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  name varchar(20) NOT NULL,
  phone_number varchar(20) NOT NULL,
  email varchar(50) NOT NULL,
  role_type varchar(10) NOT NULL CHECK (role_type IN ('ADMIN', 'SELLER', 'USER')),
  business_name varchar(20) NOT NULL,
  business_number varchar(10) NOT NULL,
  auth_status varchar(1) NOT NULL,
  created_at timestamp NOT NULL,
  created_by varchar(20) NOT NULL,
  modified_at timestamp NOT NULL,
  modified_by varchar(20) NOT NULL,
  deleted_at timestamp NULL
);

-- 테스트 계정 (password: test1234)
INSERT INTO seller_account
  (account_id, password, name, phone_number, email, role_type, business_name, business_number, auth_status, created_at, created_by, modified_at, modified_by, deleted_at)
VALUES
  ('seller1', '$2b$10$tps.3lyFY2abAaeEjiBL0.0pMNu4nscEeL20lTJUb1h9KthmZcNOK', '테스트판매자', '01012341234', 'seller1@test.com', 'SELLER', '테스트사업장', '1234567890', 'Y', NOW(), 'system', NOW(), 'system', NULL);