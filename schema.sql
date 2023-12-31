-- Create DB --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- selected DB to use for future commands --
USE employee_db;

-- create table department --
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(30) NOT NULL

);
-- create table named role --
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,     
     title VARCHAR(30) NOT NULL,
     salary DECIMAL UNSIGNED NOT NULL,
     department_id INT UNSIGNED NOT NULL
    
  
);
-- create table named employee --
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL
    
);