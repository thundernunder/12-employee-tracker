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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Nate', 'Underwood', 3, 4), 
('Les', 'Johnson', 7, 9), 
('Count', 'Olaf', 1, 6), 
('Cassian', 'Andor', 2, 11), 
('Remus', 'Lupin', 4, 1), 
('Thorin', 'Oakenshield', 2, 11), 
('Sandor', 'Clegane', 2, 6), 
('Lyra', 'Silvertongue', 6, 2);

