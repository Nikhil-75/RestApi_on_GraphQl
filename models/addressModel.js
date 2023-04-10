const Sequelize = require("sequelize");
const sequelize = require("../db");


const tableName = "Address";

const Address = sequelize.define(
  "Address",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

    state: { type: Sequelize.STRING },

    city: { type: Sequelize.STRING },

    pin_code: { type: Sequelize.STRING, allowNull: false },

    phone_no: { type: Sequelize.STRING, allowNull: false, unique: true },
  },
  { tableName }
);

module.exports =  Address ;
