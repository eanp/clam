-- Active: 1694760067329@@103.175.220.196@5432@sandbox03@public

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- users
CREATE TABLE
    users (
        id uuid DEFAULT uuid_generate_v4 (),
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(1000) NOT NULL,
        username VARCHAR(50) NOT NULL,
        name VARCHAR(50),
        phone VARCHAR(20),
        PRIMARY KEY (id)
    );

CREATE TABLE
    groups(
        id SERIAL NOT NULL,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100),
        PRIMARY KEY (id)
    )

CREATE TABLE
    users_groups(
        id SERIAL NOT NULL,
        user_id VARCHAR, 
        group_id NUMERIC, 
        PRIMARY KEY (id)
    )


-- add users admin & password is 12345678
INSERT INTO
    users(email, password, username)
VALUES
(
        'test@test.com',
        '$argon2id$v=19$m=65536,t=3,p=4$8d8+pzlHgGv6HXxSrkr4tQ$z9V3bpBMayZjpP3O87OSxmtkYwoPc2BgVO3Vdh9ZQZs',
        'admin test'
    );