USE empTrack_db;

INSERT INTO department(id,name)
VALUES 
    (001,"Sales"),
    (002,"Engineering"),
    (003,"Legal"),
    (004,"Finance");

INSERT INTO role(id,title,salary,department_id)
VALUES
    (001,"Sales Lead",'100000.00','1'),
    (002,"Salesperson","80000",'1'),
    (003,"Lead Engineer","150000",'2'),
    (004,"Software Engineer","120000",'2'),
    (010,"Jr. Software Engineer","100000",'2'),
    (009,"Entry Software Engineer","85000",'2'),
    (005,"Account Manager","160000",'4'),
    (006,"Accountant","125000",'4'),
    (007,"Legal Team Lead","250000",'3'),
    (008,"Laywer","190000",'3');

INSERT INTO employee()
VALUES
    (001,"John","Doe",'1',NULL),
    (002,"Mike","Chan",'2','1'),
    (003,"Ashley","Rodriguez",'3',NULL),
    (004,"Kevin","Tupik",'4','3'),
    (005,"Kunal","Singh",'5',NULL),
    (006,"Malia","Brown",'6','5'),
    (007,"Sarah","Lourd",'7',NULL),
    (008,"Tom","Allen",'8','7'),
    (009,"Joe","Allen",'4','3'),
    (010,"Lyle","Joseph",'10','3'),
    (011,"Brain","Smith",'10','3'),
    (012,"Bryan","Smith",'9','4'),
    (013,"Kyle","Owl",'9','4'),
    (014,"Heather","South",'9','9'),
    (015,"Taylor","Beer",'9','9');
    