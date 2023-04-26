const express = require('express');
const Router = require('express').Router;
const {allEmp, addEmp,updateEmp,viewAllEmp,managerLimit, vbymanager, vbydepartment} = require('../lib/prepSQL.js');
const employees = Router();

// GET request for employees
employees.get('/employees', async (req, res) => {  
  // Query database  S
  res.status(200).send(JSON.parse(await allEmp()));
  
  //return results
  return res;
  
});
// GET request for employees/view
employees.get('/employees/view', async (req, res) => {  
  // Query database  S
 
    res.status(200).send(JSON.parse(await viewAllEmp()));
  
  
  
  //return results
  return res;
  
});
employees.get('/employees/managers', async (req, res) => {  
  // Query database  S
  const uni = await managerLimit();
  res.status(200).send(await managerLimit());
  
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
  // console.info(first_name);
  // console.info(last_name);
  // console.info(role_id);
  // console.info(manager_id);

  // If all the required properties are present
  if (first_name && last_name && role_id) {
    //db stuff here
    await addEmp(first_name,last_name,role_id,manager_id=== undefined?"NULL":manager_id);

    const response = {
      status: 'success',
      body: req.body,
    };

    //console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding employee');
  }
  //return results
  return res;
});
employees.post('/employees/view:id:type', async (req,res)=> {
  const opthatsdf = req.params;
  let someData
  const {id, type} = req.body;
if (type === 'manager') {
    someData = await vbymanager(id);
    res.status(201).send(someData);
  }
  if (type === 'department') {
    someData = await vbydepartment(id);
    res.status(201).send(someData);
  }
  
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

    //console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting update');
  }
  //return results
  return res;
});






module.exports = employees;