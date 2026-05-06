INSERT INTO role (name)
VALUES ('ADMIN'), ('USER'), ('OWNER'), ('STAFF');

INSERT INTO genre (name)
VALUES
    ('HORROR'),
    ('ROMANCE'),
    ('ACTION'),
    ('COMEDY'),
    ('DRAMA'),
    ('FANTASY'),
    ('THRILLER'),
    ('MYSTERY'),
    ('CRIME'),
    ('ADVENTURE'),
    ('SCIENCE_FICTION'),
    ('ETC');

INSERT INTO account (
    account_id,
    password,
    name,
    phone_number,
    email,
    profile_name,
    profile_image,
    profile_text,
    birthday,
    gender,
    created_at,
    created_by,
    modified_at,
    modified_by,
    deleted_at
)
VALUES
    (
        'admin_master',
        '$2a$10$sqHaul1rEVA/OO3qhTAwm.LG/U2ircZBvVVnxJI0dWCKzb72ztnD6',
        '관리자',
        '01011112222',
        'admin@moyeobang.com',
        '총관리자',
        'https://example.com/images/admin.png',
        '운영 전용 계정입니다.',
        '1990-01-15',
        'F',
        NOW(),
        'system',
        NOW(),
        'system',
        NULL
    ),
    (
        'owner_escape',
        '$2a$10$sqHaul1rEVA/OO3qhTAwm.LG/U2ircZBvVVnxJI0dWCKzb72ztnD6',
        '홍대점장',
        '01022223333',
        'owner@moyeobang.com',
        '미로연구소',
        'https://example.com/images/owner.png',
        '홍대 미스터리 테마를 운영합니다.',
        '1992-04-20',
        'M',
        NOW(),
        'system',
        NOW(),
        'system',
        NULL
    ),
    (
        'user_horror',
        '$2a$10$sqHaul1rEVA/OO3qhTAwm.LG/U2ircZBvVVnxJI0dWCKzb72ztnD6',
        '공포매니아',
        '01033334444',
        'horror@moyeobang.com',
        '심야탐험가',
        'https://example.com/images/user-horror.png',
        '공포와 스릴러 장르를 좋아합니다.',
        '1998-08-11',
        'F',
        NOW(),
        'system',
        NOW(),
        'system',
        NULL
    ),
    (
        'user_romance',
        '$2a$10$sqHaul1rEVA/OO3qhTAwm.LG/U2ircZBvVVnxJI0dWCKzb72ztnD6',
        '감성플레이어',
        '01044445555',
        'romance@moyeobang.com',
        '낭만추리단',
        NULL,
        '드라마와 로맨스 위주의 스토리 테마를 선호합니다.',
        '2000-02-14',
        'M',
        NOW(),
        'system',
        NOW(),
        'system',
        NULL
    );

INSERT INTO account_role (account_id, role_id)
SELECT a.id, r.id
FROM account a
JOIN role r ON r.name = 'ADMIN'
WHERE a.account_id = 'admin_master';

INSERT INTO account_role (account_id, role_id)
SELECT a.id, r.id
FROM account a
JOIN role r ON r.name = 'OWNER'
WHERE a.account_id = 'owner_escape';

INSERT INTO account_role (account_id, role_id)
SELECT a.id, r.id
FROM account a
JOIN role r ON r.name = 'USER'
WHERE a.account_id IN ('user_horror', 'user_romance');

INSERT INTO preference_genre (account_id, genre_id)
SELECT a.id, g.id
FROM account a
JOIN genre g ON g.name IN ('HORROR', 'THRILLER', 'MYSTERY')
WHERE a.account_id = 'user_horror';

INSERT INTO preference_genre (account_id, genre_id)
SELECT a.id, g.id
FROM account a
JOIN genre g ON g.name IN ('ROMANCE', 'DRAMA', 'FANTASY')
WHERE a.account_id = 'user_romance';

INSERT INTO store (
    account_id,
    business_name,
    business_number,
    branch_name,
    address,
    address_detail,
    latitude,
    longitude,
    auth_status,
    created_at,
    created_by,
    modified_at,
    modified_by,
    deleted_at
)
SELECT
    a.id,
    '미로연구소',
    '1234567890',
    '홍대점',
    '서울특별시 마포구 와우산로 123',
    '2층',
    37.5569930,
    126.9226790,
    'APPROVED',
    NOW(),
    'system',
    NOW(),
    'system',
    NULL
FROM account a
WHERE a.account_id = 'owner_escape';

INSERT INTO store (
    account_id,
    business_name,
    business_number,
    branch_name,
    address,
    address_detail,
    latitude,
    longitude,
    auth_status,
    created_at,
    created_by,
    modified_at,
    modified_by,
    deleted_at
)
SELECT
    a.id,
    '미로연구소',
    '1234567891',
    '강남점',
    '서울특별시 강남구 테헤란로 321',
    'B1',
    37.5012743,
    127.0395850,
    'PENDING',
    NOW(),
    'system',
    NOW(),
    'system',
    NULL
FROM account a
WHERE a.account_id = 'owner_escape';

INSERT INTO theme (
    store_id,
    title,
    description,
    min_headcount,
    max_headcount,
    play_time,
    difficulty_level,
    fear_level,
    activity_level,
    created_at,
    created_by,
    modified_at,
    modified_by,
    deleted_at
)
SELECT
    s.id,
    '심연의 저택',
    '폐저택에 숨겨진 실종 사건의 진실을 추적하는 정통 공포 추리 테마입니다.',
    2,
    6,
    75,
    4,
    5,
    3,
    NOW(),
    'system',
    NOW(),
    'system',
    NULL
FROM store s
WHERE s.business_number = '1234567890';

INSERT INTO theme (
    store_id,
    title,
    description,
    min_headcount,
    max_headcount,
    play_time,
    difficulty_level,
    fear_level,
    activity_level,
    created_at,
    created_by,
    modified_at,
    modified_by,
    deleted_at
)
SELECT
    s.id,
    '비밀 문학회',
    '사라진 소설가의 원고를 찾아 문학회 멤버들의 비밀을 파헤치는 감성 미스터리 테마입니다.',
    2,
    5,
    70,
    3,
    1,
    2,
    NOW(),
    'system',
    NOW(),
    'system',
    NULL
FROM store s
WHERE s.business_number = '1234567890';

INSERT INTO theme (
    store_id,
    title,
    description,
    min_headcount,
    max_headcount,
    play_time,
    difficulty_level,
    fear_level,
    activity_level,
    created_at,
    created_by,
    modified_at,
    modified_by,
    deleted_at
)
SELECT
    s.id,
    '코드네임 제로',
    '도심 한복판 비밀기지에서 정보 유출을 막아야 하는 액션 잠입 테마입니다.',
    3,
    6,
    60,
    3,
    2,
    5,
    NOW(),
    'system',
    NOW(),
    'system',
    NULL
FROM store s
WHERE s.business_number = '1234567891';

INSERT INTO theme_genre (theme_id, genre_id)
SELECT t.id, g.id
FROM theme t
JOIN genre g ON g.name IN ('HORROR', 'THRILLER', 'MYSTERY')
WHERE t.title = '심연의 저택';

INSERT INTO theme_genre (theme_id, genre_id)
SELECT t.id, g.id
FROM theme t
JOIN genre g ON g.name IN ('DRAMA', 'ROMANCE', 'MYSTERY')
WHERE t.title = '비밀 문학회';

INSERT INTO theme_genre (theme_id, genre_id)
SELECT t.id, g.id
FROM theme t
JOIN genre g ON g.name IN ('ACTION', 'ADVENTURE')
WHERE t.title = '코드네임 제로';

INSERT INTO price_policy (
    store_id,
    theme_id,
    name,
    start_date,
    end_date,
    day_of_week,
    start_time,
    end_time,
    is_all_day,
    priority,
    active,
    created_at,
    created_by,
    modified_at,
    modified_by
)
SELECT
    s.id,
    t.id,
    '심연의 저택 평일 정책',
    '2026-01-01',
    NULL,
    31,
    '10:00',
    '18:00',
    FALSE,
    1,
    TRUE,
    NOW(),
    'system',
    NOW(),
    'system'
FROM store s
JOIN theme t ON t.store_id = s.id
WHERE s.business_number = '1234567890'
  AND t.title = '심연의 저택';

INSERT INTO price_policy (
    store_id,
    theme_id,
    name,
    start_date,
    end_date,
    day_of_week,
    start_time,
    end_time,
    is_all_day,
    priority,
    active,
    created_at,
    created_by,
    modified_at,
    modified_by
)
SELECT
    s.id,
    t.id,
    '비밀 문학회 주말 정책',
    '2026-01-01',
    NULL,
    96,
    '11:00',
    '22:00',
    FALSE,
    1,
    TRUE,
    NOW(),
    'system',
    NOW(),
    'system'
FROM store s
JOIN theme t ON t.store_id = s.id
WHERE s.business_number = '1234567890'
  AND t.title = '비밀 문학회';

INSERT INTO price_policy (
    store_id,
    theme_id,
    name,
    start_date,
    end_date,
    day_of_week,
    start_time,
    end_time,
    is_all_day,
    priority,
    active,
    created_at,
    created_by,
    modified_at,
    modified_by
)
SELECT
    s.id,
    t.id,
    '코드네임 제로 상시 정책',
    '2026-01-01',
    NULL,
    127,
    NULL,
    NULL,
    TRUE,
    1,
    TRUE,
    NOW(),
    'system',
    NOW(),
    'system'
FROM store s
JOIN theme t ON t.store_id = s.id
WHERE s.business_number = '1234567891'
  AND t.title = '코드네임 제로';

INSERT INTO price_detail (
    price_policy_id,
    min_headcount,
    max_headcount,
    price,
    created_at,
    created_by,
    modified_at,
    modified_by
)
SELECT
    pp.id,
    2,
    3,
    50000,
    NOW(),
    'system',
    NOW(),
    'system'
FROM price_policy pp
WHERE pp.name = '심연의 저택 평일 정책';

INSERT INTO price_detail (
    price_policy_id,
    min_headcount,
    max_headcount,
    price,
    created_at,
    created_by,
    modified_at,
    modified_by
)
SELECT
    pp.id,
    4,
    6,
    90000,
    NOW(),
    'system',
    NOW(),
    'system'
FROM price_policy pp
WHERE pp.name = '심연의 저택 평일 정책';

INSERT INTO price_detail (
    price_policy_id,
    min_headcount,
    max_headcount,
    price,
    created_at,
    created_by,
    modified_at,
    modified_by
)
SELECT
    pp.id,
    2,
    4,
    60000,
    NOW(),
    'system',
    NOW(),
    'system'
FROM price_policy pp
WHERE pp.name = '비밀 문학회 주말 정책';

INSERT INTO price_detail (
    price_policy_id,
    min_headcount,
    max_headcount,
    price,
    created_at,
    created_by,
    modified_at,
    modified_by
)
SELECT
    pp.id,
    5,
    6,
    120000,
    NOW(),
    'system',
    NOW(),
    'system'
FROM price_policy pp
WHERE pp.name = '코드네임 제로 상시 정책';