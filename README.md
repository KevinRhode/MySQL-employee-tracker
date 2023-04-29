# MySQL employee tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)
## Description

To manage my employee information through a SQL Database. To work with MySQL more I built this CLI to handle basic functions on tables in the database. It solves the need of handleing my ever increaseing company size. I learned more on handling SQL queries, prepared statemnets, and Data Reports.

## Table of Contents 

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## User Story
AS A business owner  
I WANT to be able to view and manage the departments, roles, and employees in my company  
SO THAT I can organize and plan my business  

## Acceptance Criteria
GIVEN a command-line application that accepts user input  
WHEN I start the application  
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role  
WHEN I choose to view all departments  
THEN I am presented with a formatted table showing department names and department ids  
WHEN I choose to view all roles  
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role  
WHEN I choose to view all employees  
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to  
WHEN I choose to add a department  
THEN I am prompted to enter the name of the department and that department is added to the database  
WHEN I choose to add a role  
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database  
WHEN I choose to add an employee  
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database  
WHEN I choose to update an employee role  
THEN I am prompted to select an employee to update and their new role and this information is updated in the database  

## Installation
  MySQL - MAC --  
  brew install mysql  
  The server is set up without a default root password. You can connect to it using the following command:  
  mysql -u root  
  Important: You should change the root password after you install MySQL Server. You can do this with the following command:  
  mysql_secure_installation  
    
  MySQL -PC -- (TA Will Ref)  
  MySQL https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/   
  PC users: if you get the error “command not found” please refer to the SQL documentation on customizing the PATH   
  https://dev.mysql.com/doc/mysql-windows-excerpt/5.7/en/mysql-installation-windows-path.html  
  (End Ref)

  Clone - git clone git@github.com:KevinRhode/svg-logo-gen.git  
  Node.js - Verison 16.18.0  
  [DownloadLinks](https://nodejs.org/download/release/v16.18.0/)  
  Install Node.js, once done move onto next
  Navigate to index.js file location in terminal  
  npm - npm install  


## Usage

Navigate to index.js file location in terminal  
Node index.js  
this will start the program, and begin asking for user inputs
Demo is of 
   
Basic Functions -   
View all Emp, Roles, Departments,  
Add Emp,  
Update Emp Role,  
Add Role,  
Add Department,  
Quit

Demo only shows basic functions
 [Demo]()  
 
Adv Functions-  
Delete,  
View Employees by Manager,  
View Employees by Department
 


## Credits
[inquirer](https://www.npmjs.com/package/inquirer)  
[console logo](https://patorjk.com/software/taag/#p=display&f=Big&t=Employee%20Manager)  
[install MySQL TA Doc Ref](https://github.com/Will-Nollert)

## License

MIT License - https://choosealicense.com/licenses/mit/

