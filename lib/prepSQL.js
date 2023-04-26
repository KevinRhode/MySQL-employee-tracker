// get the client
class SQLCommands{
  constructor(){

  }
  mysql= require('mysql2');
  connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      database: 'empTrack_db'
    }
    // {host:'localhost', user: 'root', database: 'test'}
  );

   allEmp = async () => {
    let data;
    await con.promise().query(`SELECT CONCAT(first_name, ' ', last_name) AS Name, title AS Role, salary AS Salary, department.name AS Department
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id;`)
    .then( ([rows,fields]) => {
      //console.log(rows);
      data = JSON.stringify(rows);
    })
    .catch(console.log)
    // .then( () => con.end())
    .then(()=> {
      // console.info("hit");
      // console.info(data)
    });
      return data;
    
  }
  //add
   addEmp = async (fName,lName,rId, mId) =>{
    await con.promise().query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ("${fName}","${lName}","${rId}",${mId});`)
    .catch(console.log);
  }
  //update
   updateEmp = async (id, emp) =>{
    const {first_name, last_name, role_id, manager_id} = emp;
    let SET = '';
    for (const key in emp) {
        const element = emp[key];
        if (element != undefined) {
          SET += `\`${key}\` =  '${element}' `
        }     
      
    }
    await con.promise().query(`UPDATE \`employee\` SET ${SET} WHERE (\`id\` = '${id}');`)
    .catch(console.log);
  }
  //view all role
   allRole = async () => {
    let data;
    await con.promise().query("SELECT * FROM `role`")
      .then( ([rows,fields]) => {
        //console.log(rows);
        data = JSON.stringify(rows);
      })
      .catch(console.log)
      // .then( () => con.end())
      .then(()=> {
        // console.info("hit");
        // console.info(data)
      });
    return data;
      
  }
   titleOfRole = async () => {
    let data;
    await con.promise().query("SELECT id,title FROM `role`")
      .then( ([rows,fields]) => {
        //console.log(rows);
        data = JSON.stringify(rows);
      })
      .catch(console.log)
      // .then( () => con.end())
      .then(()=> {
        // console.info("hit");
        // console.info(data)
      });
    return data;
  }
  //add role
   addRole = async (title,salary,department_id) =>{
    await con.promise().query(`INSERT INTO role(title,salary,department_id) VALUES ("${title}","${salary}","${department_id}");`)
    .catch(console.log);
  }
  //view all department
   allDepartment = async () => {
    let data;
    await con.promise().query("SELECT * FROM `department`")
      .then( ([rows,fields]) => {
        //console.log(rows);
        data = JSON.stringify(rows);
      })
      .catch(console.log)
      // .then( () => con.end())
      .then(()=> {
        // console.info("hit");
        // console.info(data)
      });
  
    return data;
      
  }
  //add role
   addDepartment = async (name) =>{
    await con.promise().query(`INSERT INTO department(name) VALUES ("${name}");`)
    .catch(console.log);
  }

}
const { json } = require('express');
const mysql = require('mysql2');

// create the connection

const con = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'empTrack_db'
  }
  // {host:'localhost', user: 'root', database: 'test'}
);
//view all
const viewAllEmp = async () => {
  let data;
  await con.promise().query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name AS Department, salary AS Salary, CONCAT(m.first_name, ' ',m.last_name) AS Manager
  FROM employee e
  JOIN role ON e.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee m ON e.manager_id = m.id
  ORDER BY e.id;`)
  .then( ([rows,fields]) => {
    //console.log(rows);
    data = JSON.stringify(rows);
  })
  .catch(console.log)
  // .then( () => con.end())
  .then(()=> {
    // console.info("hit");
    // console.info(data)
  });
    return data;
}
//return all emp
const allEmp = async () => {
  let data;
  await con.promise().query(`SELECT * FROM employee`)
  .then( ([rows,fields]) => {
    //console.log(rows);
    data = JSON.stringify(rows);
  })
  .catch(console.log)
  // .then( () => con.end())
  .then(()=> {
    // console.info("hit");
    // console.info(data)
  });
    return data;
  
}
//add
const addEmp = async (fName,lName,rId, mId) =>{
  await con.promise().query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ("${fName}","${lName}","${rId}",${mId});`)
  .catch(console.log);
}
//update
const updateEmp = async (id, emp) =>{
  const {first_name, last_name, role_id, manager_id} = emp;
  let SET = '';
  for (const key in emp) {
      const element = emp[key];
      if (element != undefined) {
        SET += `\`${key}\` =  '${element}' `
      }     
    
  }
  await con.promise().query(`UPDATE \`employee\` SET ${SET} WHERE (\`id\` = '${id}');`)
  .catch(console.log);
}
//view all role
const allRole = async () => {
  let data;
  await con.promise().query("SELECT * FROM `role`")
    .then( ([rows,fields]) => {
      //console.log(rows);
      data = JSON.stringify(rows);
    })
    .catch(console.log)
    // .then( () => con.end())
    .then(()=> {
      // console.info("hit");
      // console.info(data)
    });
  return data;
    
}
const titleOfRole = async () => {
  let data;
  await con.promise().query("SELECT id,title FROM `role`")
    .then( ([rows,fields]) => {
      //console.log(rows);
      data = JSON.stringify(rows);
    })
    .catch(console.log)
    // .then( () => con.end())
    .then(()=> {
      // console.info("hit");
      // console.info(data)
    });
  return data;
}
//add role
const addRole = async (title,salary,department_id) =>{
  await con.promise().query(`INSERT INTO role(title,salary,department_id) VALUES ("${title}","${salary}","${department_id}");`)
  .catch(console.log);
}
//view all department
const allDepartment = async () => {
  let data;
  await con.promise().query("SELECT * FROM `department`")
    .then( ([rows,fields]) => {
      //console.log(rows);
      data = JSON.stringify(rows);
    })
    .catch(console.log)
    // .then( () => con.end())
    .then(()=> {
      // console.info("hit");
      // console.info(data)
    });

  return data;
    
}
//add role
const addDepartment = async (name) =>{
  await con.promise().query(`INSERT INTO department(name) VALUES ("${name}");`)
  .catch(console.log);
}

const reportBonus = async (id)=>{
  const report =await con.promise().query(`SELECT department.name AS Department, SUM(salary) AS Budget
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  WHERE department_id = ${id};`)
  .catch(console.log);
  return report[0];
}

async function deleteWildCard (id, tableName){
  await con.promise().query(`DELETE FROM \`${tableName}\` WHERE (\`id\` = ${id});`)
  .catch(console.log);
  return {status:'success',message:'Deleted from the table'};
}
const vbymanager = async (id)=>{
  const report =await con.promise().query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name AS Department, salary AS Salary, CONCAT(m.first_name, ' ',m.last_name) AS Manager
  FROM employee e
  JOIN role ON e.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee m ON e.manager_id = m.id
  
  WHERE e.manager_id = ${id};`)
  .catch(console.log);
  return report[0];
}
const vbydepartment = async (id)=>{
  const report =await con.promise().query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name AS Department, salary AS Salary, CONCAT(m.first_name, ' ',m.last_name) AS Manager
  FROM employee e
  JOIN role ON e.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee m ON e.manager_id = m.id
  
  WHERE role.department_id = ${id};`)
  .catch(console.log);
  return report[0];
}

const managerLimit = async ()=>{
  const report = await con.promise().query(`SELECT DISTINCT(e.manager_id), m.first_name, m.last_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id;`)
  .catch(console.log);
  return report[0];
}



module.exports = {allEmp,allDepartment,allRole,addEmp,updateEmp,addRole,titleOfRole,addDepartment,viewAllEmp,reportBonus,vbymanager,deleteWildCard,managerLimit,vbydepartment,SQLCommands};