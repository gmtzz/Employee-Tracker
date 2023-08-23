USE employee_db

INSERT INTO department 
(department_name)
VALUES
("Human Resources"),
("Marketing"),
("Sales"),
("Engineering"),
("Finance"),
("Customer Service");

INSERT INTO role
(title, salary, department_id)
VALUES 
("HR Lead", 60000, 1),
("Marketing Associate", 40000, 2),
("Sales Manager", 90000, 3),
("Software Engineer", 120000,4),
("Accountant", 80000,5),
("Customer Service Associate", 35000,6);
