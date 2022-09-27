INSERT INTO department (department_name)
VALUES 
('Sales'),
('HR'),
('Programming'),
('IT'),
('Executive');

INSERT INTO role (title, salary, department_id)
VALUES
('Vice President', 250000, 01),
('Executive Director', 200000, 01), 
('Managing Partner', 150000, 01), 
('Senior IT Director', 150000, 02),
('IT Director', 125000, 02);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Nate', 'Underwood', 03), 
('Les', 'Johnson', 07), 
('Count', 'Olaf', 01), 
('Cassian', 'Andor', 02), 
('Remus', 'Lupin', 04), 
('Thorin', 'Oakenshield', 02), 
('Sandor', 'Clegane', 02), 
('Lyra', 'Silvertongue', 06);

UPDATE `employeeTracker_db`.`employee` SET `manager_id` = '1' WHERE (`employee_id` > '1');

