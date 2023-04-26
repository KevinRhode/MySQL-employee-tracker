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
INSERT INTO department(id,name)
VALUES
    (001,"");



-- Try to add some additional functionality to your application, such as the ability to do the following:

-- Update employee managers.

-- View employees by manager.

-- View employees by department.


-- Delete departments, roles, and employees.

-- View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
SELECT department.name, SUM(salary) AS Budget
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
GROUP BY department_id;