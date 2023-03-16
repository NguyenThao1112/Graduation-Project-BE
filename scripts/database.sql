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
    token VARCHAR(255) DEFAULT NULL,
    token_expired_in DATETIME DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE mentor_information (
    id INT NOT NULL AUTO_INCREMENT,
    account_id INT NOT NULL,
    
    -- base info
    name VARCHAR(255) DEFAULT NULL,
    gender VARCHAR(10) DEFAULT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,

    -- academic rank stuffs
    academic_rank_id INT DEFAULT NULL,
    academic_rank_gain_year INT DEFAULT NULL,


    -- academic title stuffs
    academic_title_id INT DEFAULT NULL,
    academic_title_gain_year INT DEFAULT NULL, 

    -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    -- for further exploration
    expand_column VARCHAR(255),

    PRIMARY KEY(id)
)