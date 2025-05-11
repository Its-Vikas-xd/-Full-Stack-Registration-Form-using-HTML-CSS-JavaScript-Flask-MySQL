-- Run this in MySQL
CREATE DATABASE flaskdb;

USE flaskdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    age INT,
    password VARCHAR(100)
);


