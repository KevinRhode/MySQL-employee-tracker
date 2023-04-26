const express = require('express');
const Router = require('express').Router;
const employees = require('./employees.js');
const departments = require('./departments.js');
const roles = require('./roles.js');
const util = require('./util.js')

const api = Router();
// Connect to database
api.use('/api',employees);
api.use('/api',departments);
api.use('/api',roles);
api.use('/api',util);

module.exports = api;