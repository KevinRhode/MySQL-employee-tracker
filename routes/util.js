const express = require('express');
const Router = require('express').Router;
const {deleteWildCard} = require('../lib/prepSQL.js');
const util = Router();

//DELETE
util.delete('/delete/:table/:id',async (req,res)=>{
    if (req.params.id && req.params.table) {
      
      res.status(200).send(await deleteWildCard(req.params.id,req.params.table));
      return res;
    }
  })

module.exports = util;