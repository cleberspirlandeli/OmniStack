const express = require('express');

const UsersController = require('../controller/UsersController');

const routes = express.Router();

// Users
routes.get('/users', UsersController.index);
routes.post('/users/register', UsersController.register);
routes.get('/users/active', UsersController.active);
routes.post('/users/authentication', UsersController.authentication);

module.exports = routes;
