USE employee_db
-- inserts names of depts into designated table --
INSERT INTO department 
(id, department_name)
VALUES
(1,'Human Resources'),
(2,'Marketing'),
(3,'Sales'),
(4,'Engineering'),
(5,'Finance'),
(6,'Customer Service');

-- inserts employee roles into role table --
INSERT INTO role
(title, salary, department_id)
VALUES 
('HR Lead', 60000, 1),
('Marketing Associate', 40000, 2),
('Sales Manager', 90000, 3),
('Software Engineer', 120000,4),
('Accountant', 80000,5),
('Customer Service Associate', 35000,6);
-- insert employee info into employee table --
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES 
('Jane','Doe', 1, NULL),
('Hugo','Martinez',2, NULL),
('Grace', 'Ullman',3,NULL),
('Javier','Cruz',4,7),
('Jake','Maglio',5,5),
('Desiree','Saindon',6,NULL);