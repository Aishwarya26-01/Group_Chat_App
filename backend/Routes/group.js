const express = require('express');
const routes = express.Router();

const groupController = require('../Controllers/group');
const middleware = require('../Middleware/auth');

routes.post('/groups', middleware.authenticate, groupController.createNewGroup);
routes.get('/groups', middleware.authenticate, groupController.getAllGroups);

module.exports=routes;