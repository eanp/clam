-- Active: 1694760067329@@103.175.220.196@5432@sandbox03@public
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- users
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4 (),
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    name VARCHAR,
    phone VARCHAR,
    PRIMARY KEY (id)
);

-- add users admin & password is 12345678
INSERT INTO users(email,password,username) VALUES('test@test.com','$argon2id$v=19$m=65536,t=3,p=4$8d8+pzlHgGv6HXxSrkr4tQ$z9V3bpBMayZjpP3O87OSxmtkYwoPc2BgVO3Vdh9ZQZs','admin test');

