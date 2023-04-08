const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");

const tableName = 'Users';

const Users  = sequelize.define('users',{
        
    username:  DataTypes.STRING,
    firstName:  DataTypes.STRING,
    lastName:    DataTypes.STRING,
    email:   DataTypes.STRING,
    password: DataTypes.STRING,
  
}, {
    tableName 
})


module.exports =  Users ;

