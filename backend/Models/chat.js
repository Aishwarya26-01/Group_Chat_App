const Sequelize = require('sequelize');
const sequelize = require('../Utils/database');

const Chat = sequelize.define('chat',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    message: Sequelize.STRING,
    name: Sequelize.STRING
});

module.exports = Chat;