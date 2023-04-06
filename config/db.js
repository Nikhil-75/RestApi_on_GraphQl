require('dotenv').config('');

const Sequelize = require('sequelize');
const {PASSWORD} = require('./index')

const sequelize = new Sequelize('users', 'postgres', PASSWORD,{
  host:'localhost',
  dialect: 'postgres',
  port:5432,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})





module.exports = sequelize;










