const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
 

const db = {}

db.sequelize = Sequelize;
db.sequelize = sequelize

db.sequelize.sync({ force: false})
.then(()=>{
    console.log('yes,')
})

//db.users = require('./Users')(sequelize,DataTypes)

module.exports = db;