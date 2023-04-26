

const express = require('express');
const Router = require('express').Router;
const {allRole,addRole,titleOfRole} = require('../lib/prepSQL.js');
const roles = Router();

// GET request for role
roles.get('/roles', async (req, res) => {  
    // Query database  
    res.status(200).send(JSON.parse(await allRole()));
    
    //return results
    return res;
    
});
  //get request for role filtered to names
roles.get('/roles/titles',async (req,res)=>{
   // Query database  
   res.status(200).send(JSON.parse(await titleOfRole()));
    
   //return results
   return res;
  
  
});
  //POST add role
roles.post('/roles', async (req, res) => {  
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
  
      // console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in adding role');
    }
    //return results
    return res;
    
});
  
module.exports = roles;