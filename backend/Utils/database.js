const Sequelize = require('sequelize');

const sequelize = new Sequelize('group-chat-app', 'root', 'Aishwarya@26', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;