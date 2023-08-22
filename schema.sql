-- Create DB --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- selected DB to use for future commands --
USE employee_db;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(30) NOT NULL

);