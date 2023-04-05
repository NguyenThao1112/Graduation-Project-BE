CREATE DATABASE nckh;
USE nckh;

CREATE TABLE account (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    role INT NOT NULL,
    token VARCHAR(255) DEFAULT NULL,
    token_expired_in DATETIME DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE lecturer_information (
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
);

CREATE TABLE contact_type (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) DEFAULT NULL,

     -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

CREATE TABLE academic_rank (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) DEFAULT NULL,

     -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

CREATE TABLE academic_title (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) DEFAULT NULL,

     -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

-- Article stuffs

CREATE TABLE article (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    journal VARCHAR(255) DEFAULT NULL,
    year INT DEFAULT NULL,
    page_from INT DEFAULT NULL,
    page_to INT DEFAULT NULL,
    volume INT DEFAULT NULL,
    issue INT DEFAULT NULL,
    city VARCHAR(50),
    abstract LONGTEXT DEFAULT NULL,

    -- Incase thesis 
    institution VARCHAR(50) DEFAULT NULL,
    department VARCHAR(50) DEFAULT NULL,
    type VARCHAR(50) DEFAULT NULL,
    month INT DEFAULT NULL,
    day INT DEFAULT NULL,

    url_date_access DATE DEFAULT NULL,

    -- Identitifiers
    ArXivID VARCHAR(20) DEFAULT NULL,
    DOI     VARCHAR(20) DEFAULT NULL,
    ISBN    VARCHAR(20) DEFAULT NULL,
    ISSN    VARCHAR(20) DEFAULT NULL,
    PMID    VARCHAR(20) DEFAULT NULL,
    Scopus  VARCHAR(50) DEFAULT NULL,
    PII     VARCHAR(20) DEFAULT NULL,
    SGR     VARCHAR(255) DEFAULT NULL,
    
    -- for Vietnamese project
    project_id VARCHAR(50) DEFAULT NULL,

    -- for BibTeX
    citation_key VARCHAR(50) DEFAULT NULL,

    general_note TEXT DEFAULT NULL,

    -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

CREATE TABLE article_url (
    id INT NOT NULL AUTO_INCREMENT,
    article_id INT,

    url TEXT DEFAULT NULL,

    -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)  
);

CREATE TABLE article_file (
    id INT NOT NULL AUTO_INCREMENT,
    article_id INT,

    file_path TEXT DEFAULT NULL,
    original_file_name TEXT DEFAULT NULL,

    -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);

CREATE TABLE article_note (
    id INT NOT NULL AUTO_INCREMENT,
    article_id INT,

    note TEXT DEFAULT NULL,

    -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);

CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT,
    
    name VARCHAR(50) DEFAULT NULL,

    -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);


CREATE TABLE article_tag(
    id INT NOT NULL AUTO_INCREMENT,
    
    article_id INT,
    tag_id INT,

    -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);

CREATE TABLE author(
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    article_id INT DEFAULT NULL,

    first_name VARCHAR(30) DEFAULT NULL,
    last_name VARCHAR(30) DEFAULT NULL,

    -- metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);