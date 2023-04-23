// get the client
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
const allEmp = async () => {
  let data;
  await con.promise().query("SELECT * FROM `employee`")
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



module.exports = {allEmp,allDepartment,allRole,addEmp,updateEmp,addRole};