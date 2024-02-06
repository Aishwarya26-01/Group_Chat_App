const Sequelize=require('sequelize');
const sequelize=require('../Utils/database')

const UserGroup=sequelize.define('usergroup',{
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    }
});

module.exports=UserGroup;