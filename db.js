const Sequelize = require('sequelize');
const {PASSWORD} = require('./config')

const sequelize = new Sequelize('users', 'postgres', PASSWORD,{
    host:'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
})

sequelize.authenticate()
.then(()=>{
    console.log('database is connected')
}).catch((err)=>{
    console.log(err)
});

sequelize.sync();

module.exports = sequelize;