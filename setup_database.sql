-- Create Database
CREATE DATABASE IF NOT EXISTS online_portal;
USE online_portal;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id bigint NOT NULL AUTO_INCREMENT,
  created_at datetime DEFAULT NULL,
  email varchar(255) NOT NULL UNIQUE,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  role varchar(255) NOT NULL,
  updated_at datetime DEFAULT NULL,
  username varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (id),
  KEY UK_email (email),
  KEY UK_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id bigint NOT NULL AUTO_INCREMENT,
  created_at datetime DEFAULT NULL,
  description longtext,
  name varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Quizzes Table
CREATE TABLE IF NOT EXISTS quizzes (
  id bigint NOT NULL AUTO_INCREMENT,
  created_at datetime DEFAULT NULL,
  description longtext,
  max_marks int NOT NULL,
  passing_marks int NOT NULL,
  title varchar(255) NOT NULL,
  total_questions int NOT NULL,
  updated_at datetime DEFAULT NULL,
  category_id bigint NOT NULL,
  PRIMARY KEY (id),
  KEY idx_category (category_id),
  CONSTRAINT fk_quiz_category FOREIGN KEY (category_id) REFERENCES categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id bigint NOT NULL AUTO_INCREMENT,
  correct_answer varchar(255) NOT NULL,
  created_at datetime DEFAULT NULL,
  marks int NOT NULL,
  optiona longtext NOT NULL,
  optionb longtext NOT NULL,
  optionc longtext NOT NULL,
  optiond longtext NOT NULL,
  question_text longtext NOT NULL,
  quiz_id bigint NOT NULL,
  PRIMARY KEY (id),
  KEY idx_quiz (quiz_id),
  CONSTRAINT fk_question_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Quiz Results Table
CREATE TABLE IF NOT EXISTS quiz_results (
  id bigint NOT NULL AUTO_INCREMENT,
  attempted_at datetime DEFAULT NULL,
  obtained_marks int NOT NULL,
  passed bit(1) NOT NULL,
  percentage double NOT NULL,
  total_marks int NOT NULL,
  quiz_id bigint NOT NULL,
  user_id bigint NOT NULL,
  PRIMARY KEY (id),
  KEY idx_result_quiz (quiz_id),
  KEY idx_result_user (user_id),
  CONSTRAINT fk_result_user FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_result_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
