-- delete database if it exists
DROP DATABASE IF EXISTS nckh;

-- create database
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
    expand_column VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE phd_thesis (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT NOT NULL,
    project_name VARCHAR(255) DEFAULT NULL,
    phd_name VARCHAR(255) DEFAULT NULL,
    graduation_year INT DEFAULT NULL,
    education_level VARCHAR(255) DEFAULT NULL,
    note VARCHAR(255) DEFAULT NULL,
    
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

CREATE TABLE book (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    project_id INT DEFAULT NULL,
    publisher_name VARCHAR(255) DEFAULT NULL,
    public_year INT NOT NULL,
    co_authors VARCHAR(255) DEFAULT NULL,
    pseudonym VARCHAR(255) DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

CREATE TABLE book_author(
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id int NOT NULL,
    book_id int NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

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

CREATE TABLE contact (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT NOT NULL,
    contact_type_id INT NOT NULL,
    value VARCHAR(255) NOT NULL,
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

CREATE TABLE project (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT NOT NULL,
    project_code VARCHAR(255) DEFAULT NULL,
    from_date DATETIME DEFAULT NULL,
    to_date DATETIME DEFAULT NULL,
    expenditure INT NOT NULL,
    project_role VARCHAR(255) DEFAULT NULL,
    acceptance_date DATETIME,
    result VARCHAR(255) DEFAULT NULL,
    organization VARCHAR(255) DEFAULT NULL,
    note VARCHAR(255) DEFAULT NULL,
    reference VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

CREATE TABLE university (
    id INT NOT NULL AUTO_INCREMENT,
    university_name VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)

);

CREATE TABLE current_discipline (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT NOT NULL,
    discipline_id INT NOT NULL,
    department_id INT NOT NULL,
    university_id INT NOT NULL,
    position VARCHAR(255) DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

CREATE TABLE discipline (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

CREATE TABLE expertise (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

CREATE TABLE research_field (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT NOT NULL,
    research_name VARCHAR(255) NOT NULL,
    note VARCHAR(255) NOT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

CREATE TABLE degree (
    id INT NOT NULL AUTO_INCREMENT,
    discipline_id INT NOT NULL,
    lecturer_id INT NOT NULL,
    academic_title_id INT NOT NULL,
    university_id INT NOT NULL,
    graduation_thesis_name  VARCHAR(255) DEFAULT NULL,
    graduation_date DATETIME DEFAULT NULL,
    
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

CREATE TABLE work_position (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT NOT NULL,
    university_id INT NOT NULL,
    company VARCHAR(255) DEFAULT NULL,
    position VARCHAR(255) DEFAULT NULL,
    is_now BOOLEAN DEFAULT FALSE,
    from_date DATETIME DEFAULT NULL,
    to_date DATETIME DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

CREATE TABLE university_office (
    id INT NOT NULL AUTO_INCREMENT,
    university_id INT NOT NULL,
    address VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

CREATE TABLE activity (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    type_id INT NOT NULL,
    lecturer_id INT NOT NULL,
    content VARCHAR(255) DEFAULT NULL,
    from_date DATETIME,
    to_date DATETIME,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

CREATE TABLE activity_type (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);