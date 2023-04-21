DROP DATABASE IF EXISTS empTrack_db;
CREATE DATABASE empTrack_db;

USE empTrack_db;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NOT NUll,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  manager_id INT NUll,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL,
  PRIMARY KEY (id)
);
