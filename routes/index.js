const express = require('express').Router;
const employees = require('./employees.js');

const api = express();
// Connect to database

api.use('/api',employees);

module.exports = api;