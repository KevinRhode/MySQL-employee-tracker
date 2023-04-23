const express = require('express').Router;
const {allEmp,allDepartment,allRole, addEmp,updateEmp,addRole} = require('../lib/prepSQL.js');
const employees = express();



// GET request for employees
employees.get('/employees', async (req, res) => {  
  // Query database  S
  res.status(200).send(JSON.parse(await allEmp()));
  
  //return results
  return res;
  
});
// POST request for employees
employees.post('/employees', async (req, res) => {  
  // Query database  
  //res.status(200).send(JSON.parse(await allEmp()));
  // Destructuring assignment for the items in req.body
  const { first_name, last_name, role_id, manager_id } = req.body;
  
  //const requestedTerm = req.params.term.toLowerCase();

  // If all the required properties are present
  if (first_name && last_name && role_id && manager_id) {
    //db stuff here
    await addEmp(first_name,last_name,role_id,manager_id);

    const response = {
      status: 'success',
      body: req.body,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding employee');
  }
  //return results
  return res;
});
//PUT for updates
employees.put('/employees/:id', async (req, res) => {   

  const {id} = req.params;
  // Destructuring assignment for the items in req.body
  const { first_name, last_name, role_id, manager_id } = req.body;
  
  //const requestedTerm = req.params.term.toLowerCase();

  // If all the required properties are present
  if ((first_name || last_name || role_id || manager_id) && id) {
    //db stuff here
    await updateEmp(id,req.body);

    const response = {
      status: 'success',
      body: req.body,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting update');
  }
  //return results
  return res;
});
// GET request for role
employees.get('/roles', async (req, res) => {  
  // Query database  
  res.status(200).send(JSON.parse(await allRole()));
  
  //return results
  return res;
  
});
//POST add role
employees.post('/roles', async (req, res) => {  
  // Query database  
  //res.status(200).send(JSON.parse(await allEmp()));
  // Destructuring assignment for the items in req.body
  const { title, salary, department_id } = req.body;

  // If all the required properties are present
  if (title && salary && department_id ) {
    //db stuff here
    await addRole(title,salary,department_id);

    const response = {
      status: 'success',
      body: req.body,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding role');
  }
  //return results
  return res;
  
});


// GET request for department
employees.get('/departments', async (req, res) => {  
  // Query database  
  res.status(200).send(JSON.parse(await allDepartment()));
  
  //return results
  return res;
  
});



module.exports = employees;