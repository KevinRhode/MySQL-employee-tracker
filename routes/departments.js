const express = require('express');
const Router = require('express').Router;
const {allEmp,allDepartment,allRole, addEmp,updateEmp,addRole,titleOfRole,addDepartment,viewAllEmp,reportBonus, deleteWildCard} = require('../lib/prepSQL.js');
const departments = Router();

// GET request for department
departments.get('/departments', async (req, res) => {  
    // Query database  
    res.status(200).send(JSON.parse(await allDepartment()));
    
    //return results
    return res;
    
  });
departments.get('/departments/budgets/:id',async (req, res)=>{
      if (req.params.id) {
        // Query database  
        res.status(200).send(await reportBonus(req.params.id));
    
    //return results
        return res;
      }
      return res.status(400).send({message:"Missing Id"});
  });
  
departments.post('/departments',async(req,res) =>{
    // Query database  
    // res.status(200).send(JSON.parse(await allEmp()));
    // Destructuring assignment for the items in req.body
    const { name } = req.body;
    
    // const requestedTerm = req.params.term.toLowerCase();
    // console.info(first_name);
    // console.info(last_name);
    // console.info(role_id);
    // console.info(manager_id);
  
    // If all the required properties are present
    if (name) {
      // db stuff here
      await addDepartment(name);
  
      const response = {
        status: 'success',
        body: req.body,
      };
  
      // console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in adding department');
    }
    //return results
    return res;
  });

  module.exports = departments;