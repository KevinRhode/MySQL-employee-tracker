-- view all emp
SELECT *
FROM employee;
-- add emp
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES
    ("","","1",NULL);
-- update emp

-- vew all role
SELECT * 
FROM role;
-- add role

-- view all departments
SELECT * 
FROM department;
-- add departments


-- You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these

-- Bonus
-- Try to add some additional functionality to your application, such as the ability to do the following:

-- Update employee managers.

-- View employees by manager.

-- View employees by department.

-- Delete departments, roles, and employees.

-- View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.