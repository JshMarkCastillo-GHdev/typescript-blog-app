CREATE DATABASE db_auth;

CREATE TABLE users (
    id_user UUID PRIMARY KEY DEFAULT gen_random_uuid()
);