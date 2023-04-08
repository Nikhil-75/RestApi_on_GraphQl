const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    const Users  = sequelize.define('users',{
        
        username:  DataTypes.STRING,
        FirstName:  DataTypes.STRING,
        LastName:    DataTypes.STRING,
        email:   DataTypes.STRING,
        password: DataTypes.STRING,
        Password2: DataTypes.STRING
      
    }, {
        createdAt: 'create_at',
        updatedAt: 'modified_at'
    })
    return Users
}