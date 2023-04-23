const express = require('express');
const Router = require('express').Router;
const employees = require('./employees.js');

const api = Router();
// Connect to database
api.use('/api',employees);

module.exports = api;