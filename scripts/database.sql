CREATE DATABASE nckh;
USE nckh;

CREATE TABLE account (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    role INT NOT NULL,
    PRIMARY KEY(id)
)