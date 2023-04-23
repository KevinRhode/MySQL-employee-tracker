USE empTrack_db;

INSERT INTO department(id,name)
VALUES 
    (001,"Sales"),
    (002,"Engineering"),
    (003,"Legal"),
    (004,"Finance");

INSERT INTO role(id,title,salary,department_id)
VALUES
    (001,"Sales Lead",'100000.00','2'),
    (002,"Salesperson","80000",'2'),
    (003,"Lead Engineer","150000",'3'),
    (004,"Software Engineer","120000",'3'),
    (005,"Account Manager","160000",'4'),
    (006,"Accountant","125000",'4'),
    (007,"Legal Team Lead","250000",'3'),
    (008,"Laywer","190000",'3');

INSERT INTO employee()
VALUES
    (001,"John","Doe",'1',NULL),
    (002,"Mike","Chan",'2',NULL),
    (003,"Ashley","Rodriguez",'3',NULL),
    (004,"Kevin","Tupik",'4',NULL),
    (005,"Kunal","Singh",'5',NULL),
    (006,"Malia","Brown",'6',NULL),
    (007,"Sarah","Lourd",'7',NULL),
    (008,"Tom","Allen",'8',NULL);