--   delete database if it exists
DROP DATABASE IF EXISTS nckh;

--   create database
CREATE DATABASE nckh;
USE nckh;

--   tai khoan
CREATE TABLE account (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    role INT DEFAULT 1,
    token VARCHAR(255) DEFAULT NULL,
    token_expired_in DATETIME DEFAULT NULL,
    PRIMARY KEY(id)
);

--   thong tin giang vien
CREATE TABLE lecturer_information (
    id INT NOT NULL AUTO_INCREMENT,
    account_id INT DEFAULT NULL,

    --   base info
    scopus_id VARCHAR(255) DEFAULT NULL,
    name VARCHAR(255) DEFAULT NULL,
    gender VARCHAR(10) DEFAULT NULL,
    avatar LONGBLOB DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,
    bio VARCHAR(255) DEFAULT NULL,

    --  academic rank stuffs
    academic_rank_id INT DEFAULT NULL,
    academic_rank_gain_year INT DEFAULT NULL,


    --  academic title stuffs
    academic_title_id INT DEFAULT NULL,
    academic_title_gain_year INT DEFAULT NULL, 

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    --  for further exploration
    expand_column VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY(id)
);

--  file article
CREATE TABLE lecturer_file (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,

    file_path TEXT DEFAULT NULL,
    original_file_name TEXT DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);

--  nghiên cứu sinh
CREATE TABLE phd_thesis (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
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

--  bài báo, sách
CREATE TABLE book (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    project_id INT DEFAULT NULL,
    publisher_name VARCHAR(255) DEFAULT NULL,
    public_year INT DEFAULT NULL,
    co_authors VARCHAR(255) DEFAULT NULL,
    pseudonym VARCHAR(255) DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

--  tác giả bài báo, sách
CREATE TABLE book_author(
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id int DEFAULT NULL,
    book_id int DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

-- kiểu liên lạc ( email, phone, ...)
CREATE TABLE contact_type (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) DEFAULT NULL,

     --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

--  dữ liệu liên lạc tương ứng ( a@gmail.com, 0972621328)
CREATE TABLE contact (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    contact_type_id INT DEFAULT NULL,
    value VARCHAR(255) DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

--  học vị (Học vị có nhiều cấp bậc như: Tốt nghiệp trung học phổ thông; cử nhân; thạc sỹ; Tiến sỹ)
CREATE TABLE academic_rank (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) DEFAULT NULL,

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

--  học hàm ( 2 cấp phó giáo sư và giáo sư)
CREATE TABLE academic_title (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) DEFAULT NULL,

     --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

--  các bài báo
CREATE TABLE article (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    journal VARCHAR(255) DEFAULT NULL,
    journalUrl VARCHAR(255) DEFAULT NULL,
    conference VARCHAR(255) DEFAULT NULL,
    `rank` VARCHAR(10) DEFAULT NULL,
    year INT DEFAULT NULL,
    page_from VARCHAR(10) DEFAULT NULL,
    page_to VARCHAR(10) DEFAULT NULL,
    volume VARCHAR(15) DEFAULT NULL,
    issue INT DEFAULT NULL,
    city VARCHAR(50),
    abstract LONGTEXT DEFAULT NULL,

    --  Incase thesis 
    institution VARCHAR(50) DEFAULT NULL,
    department VARCHAR(50) DEFAULT NULL,
    type VARCHAR(50) DEFAULT NULL,
    month INT DEFAULT NULL,
    day INT DEFAULT NULL,

    url_date_access DATE DEFAULT NULL,

    --  Identitifiers
    ArXivID VARCHAR(20) DEFAULT NULL,
    DOI     VARCHAR(50) DEFAULT NULL,
    ISBN    VARCHAR(20) DEFAULT NULL,
    ISSN    VARCHAR(20) DEFAULT NULL,
    PMID    VARCHAR(20) DEFAULT NULL,
    Scopus  VARCHAR(50) DEFAULT NULL,
    PII     VARCHAR(20) DEFAULT NULL,
    SGR     VARCHAR(255) DEFAULT NULL,
    
    --  for Vietnamese project
    project_id VARCHAR(50) DEFAULT NULL,

    --  for BibTeX
    citation_key VARCHAR(50) DEFAULT NULL,

    general_note TEXT DEFAULT NULL,
    citationCount INT DEFAULT NULL,

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,  

    PRIMARY KEY(id)
);

--  link article
CREATE TABLE article_url (
    id INT NOT NULL AUTO_INCREMENT,
    article_id INT,

    url TEXT DEFAULT NULL,

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)  
);

--  file article
CREATE TABLE article_file (
    id INT NOT NULL AUTO_INCREMENT,
    article_id INT,

    file_path TEXT DEFAULT NULL,
    original_file_name TEXT DEFAULT NULL,

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);

CREATE TABLE article_note (
    id INT NOT NULL AUTO_INCREMENT,
    article_id INT,

    note TEXT DEFAULT NULL,

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);

-- cac loai tag
CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT,
    
    name VARCHAR(50) DEFAULT NULL,

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);


CREATE TABLE article_tag(
    id INT NOT NULL AUTO_INCREMENT,
    
    article_id INT,
    tag_id INT,

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);

-- tac gia
CREATE TABLE author(
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    article_id INT DEFAULT NULL,

    first_name VARCHAR(30) DEFAULT NULL,
    last_name VARCHAR(30) DEFAULT NULL,

    --  metadata stuffs
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)  
);

--  cac du an ( vi du : Xây dựng môi trường tích hợp trên web hỗ trợ cho đào tạo, nghiên cứu và phát triển dự án trong công nghệ phần mềm")
CREATE TABLE project (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    name VARCHAR(255) DEFAULT NULL,
    project_code VARCHAR(255) DEFAULT NULL,
    from_date VARCHAR(7) DEFAULT NULL,
    to_date VARCHAR(7) DEFAULT NULL,
    expenditure INT NOT NULL,
    project_role VARCHAR(255) DEFAULT NULL,
    acceptance_date DATE,
    result VARCHAR(255) DEFAULT NULL,
    organization VARCHAR(255) DEFAULT NULL,
    note VARCHAR(255) DEFAULT NULL,
    reference VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

--  trương đại học
CREATE TABLE university (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)

);

--  nơi làm việc hiện tại
CREATE TABLE current_discipline (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    discipline_id INT,
    department_id INT,
    university_id INT,
    position VARCHAR(255) DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

--  môn học 
CREATE TABLE discipline (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

--  khoa
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

--  lĩnh vực và chuyên ngành
CREATE TABLE expertise (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    title VARCHAR(255) DEFAULT NULL,
    specialization VARCHAR(255) DEFAULT NULL,
    code VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY(id)
);

--  hướng nghiên cứu
CREATE TABLE research_field (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    research_name VARCHAR(255) DEFAULT NULL,
    note VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

-- bằng cấp
CREATE TABLE degree (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    academic_title_id INT DEFAULT NULL,
    university_id INT DEFAULT NULL,
    specialization VARCHAR(255) DEFAULT NULL,
    graduation_thesis_name  VARCHAR(255) DEFAULT NULL,
    graduation_date INT DEFAULT NULL,
    
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

--  lịch sử các địa điểm làm việ
CREATE TABLE work_position (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    university_id INT DEFAULT NULL,
    company VARCHAR(255) DEFAULT NULL,
    position VARCHAR(255) DEFAULT NULL,
    is_now BOOLEAN DEFAULT FALSE,
    from_date INT DEFAULT NULL,
    to_date INT DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

-- chi tiết các hoạt động đã tham gia
CREATE TABLE activity (
    id INT NOT NULL AUTO_INCREMENT,
    lecturer_id INT DEFAULT NULL,
    activity_type_id INT DEFAULT NULL,
    name VARCHAR(255) DEFAULT NULL,
    note VARCHAR(255) DEFAULT NULL,
    is_now BOOLEAN DEFAULT FALSE,
    from_date INT DEFAULT NULL,
    to_date INT DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

-- các loại hoạt động ( ví dụ tham dự hội thảo)
CREATE TABLE activity_type (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,

    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY(id)
);

ALTER TABLE article CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE author CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE lecturer_information CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE university CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE expertise CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE academic_rank CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE academic_title CONVERT TO CHARACTER SET utf8mb4;


INSERT INTO contact_type(`id`, `name`, `created_at`, `updated_at`, `is_deleted`) VALUES 
    (1, 'email', SYSDATE(), SYSDATE(), 0),
    (2, 'address', SYSDATE(), SYSDATE(), 0),
    (3, 'phone', SYSDATE(), SYSDATE(), 0),
    (4, 'link', SYSDATE(), SYSDATE(), 0);

INSERT INTO academic_rank(`id`, `name`, `created_at`, `updated_at`, `is_deleted`) VALUES 
    (1, 'Phó giáo sư', SYSDATE(), SYSDATE(), 0),
    (2, 'Giáo sư', SYSDATE(), SYSDATE(), 0);

INSERT INTO academic_title(`id`, `name`, `created_at`, `updated_at`, `is_deleted`) VALUES 
    (1, 'Cử nhân', SYSDATE(), SYSDATE(), 0),
    (2, 'Thạc sĩ', SYSDATE(), SYSDATE(), 0),
    (3, 'Tiến sĩ', SYSDATE(), SYSDATE(), 0),
    (4, 'Tiến sĩ khoa học', SYSDATE(), SYSDATE(), 0);

INSERT INTO nckh.university (id, name,address,created_at,updated_at,is_deleted) VALUES
    (1, 'Viet Nam National University Ho Chi Minh City','Linh Trung Ward Ho Chi Minh City Viet Nam ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (2, 'International Training and Education Center','Ho Chi Minh City Viet Nam ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (3, 'VNUHCM-University of Science, Software Engineering Lab','227 Nguyen Van Cu Str., Dist. 5, HCM-City Viet Nam ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (4, 'John von Neumann Institute','Linh Trung, Thu Duc Ho Chi Minh City 700000 Viet Nam ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (5, 'Research Organization of Information and Systems National Institute of Informatics','2-1-2 Hitotsubashi, Chiyoda-ku Tokyo 101-8430 Japan ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (6, 'SIRET Research Group, Department of Software Engineering','Czech Republic ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (7, 'École Pratique des Hautes Études','Les Patios Saint-Jacques, 4-14 rue Ferrus Paris Ile-de-France 75014 France ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (8, 'Carnegie Mellon University','5000 Forbes Avenue Pittsburgh PA 15213-3890 United States ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (9, 'Concordia University, Faculty of Information Technology','Sir George Williams Campus, 1455 De Maisonneuve Blvd. W. Montreal QC H3G 1M8 Canada ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
 	(10, 'International Crane Foundation','Baraboo WI United States ','2023-06-16 08:50:21','2023-06-16 08:50:21',0),
    (11, 'Posts and Telecommunications Institute of Technology Vietnam, Department of Scientific Fundamentals','Hoang Quoc Viet Road Hanoi Viet Nam ','2023-06-16 10:18:53','2023-06-16 10:18:53',0), 
    (12, 'Institute for Environment and Resources','142 To Hien Thanh Street, District 10 Ho Chi Minh City 700000 Viet Nam ','2023-06-16 10:18:53','2023-06-16 10:18:53',0),
    (13, 'Institute for Circular Economy Development (ICED)','01 Vo Truong Toan, Linh Trung, Thu Duc Ho Chi Minh City Viet Nam ','2023-06-16 10:18:53','2023-06-16 10:18:53',0),
    (14, 'Institute for Computational Science and Technology','SBI Building, Quang Trung Software City, Tan Chanh Hiep Ward, District 12, Ho Chi Minh City, Vietnam Ho Chi Minh City Viet Nam ','2023-06-16 10:18:53','2023-06-16 10:18:53',0),
    (15, 'Vietnam National University Hanoi, Institute for Environment and Resources','144- Xuân Thủy Street - Cầu Giấy Hanoi Viet Nam ','2023-06-16 10:18:53','2023-06-16 10:18:53',0),
    (16, 'Information Technology College of Hochiminh City, Department of Mathematics','Hoa Thanh, Tan Phu, Hochiminh City Hoa Thanh Tan Phu Viet Nam ','2023-06-16 10:18:53','2023-06-16 10:18:53',0),
    (17, 'HCMC University of Technology','268 Ly Thuong Kiet ,District 10 Ho Chi Minh City Vietnam 70000 Viet Nam ','2023-06-16 02:58:57','2023-06-16 02:58:57',0);
 
INSERT INTO nckh.account(`id`, `email`, `password`, `created_at`, `updated_at`, `is_deleted`, `role`) VALUES
	(1, 'admin@gmail.com', '$2b$10$Bk.2cvP/4KbosKzDBMSbZurKVToTyYRhp5AiLMC4yttzjBR.DEzsa', SYSDATE(), SYSDATE(), 0, 0),
    (2, 'user@gmail.com', '$2b$10$ligux5DPLIIXqgoXnKnCvOVbKJCr2tYdGymtXbEJ6jILsZL9bkUie', SYSDATE(), SYSDATE(), 0, 1),
    (3, 'superuser@gmail.com', '$2b$10$KX.l9gLLlE9IfSggO638eeprm5gRiC7hDjieB0MxHvpSuQI1HfxtK', SYSDATE(), SYSDATE(), 0, 2);

CREATE USER 'backendnckh'@'%' IDENTIFIED BY 'Phambinh3107@';
GRANT ALL PRIVILEGES ON *.* TO 'backendnckh'@'%' WITH GRANT OPTION;
    
CREATE USER 'backendnckh'@'localhost' IDENTIFIED BY 'Phambinh3107@';
GRANT ALL PRIVILEGES ON *.* TO 'backendnckh'@'localhost' WITH GRANT OPTION;
