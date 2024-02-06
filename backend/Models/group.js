const Sequelize=require('sequelize');
const sequelize=require('../Utils/database');

const Group=sequelize.define('group',{
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    groupName:Sequelize.STRING,
    createdBy:Sequelize.INTEGER
});

module.exports=Group;