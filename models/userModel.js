const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const tableName = "Users";

const Users = sequelize.define(
  "users",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

    firstName: { type: Sequelize.STRING, allowNull: false },

    lastName: { type: Sequelize.STRING },

    email: { type: Sequelize.STRING, allowNull: false, unique: true },

    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    password: { type: Sequelize.STRING, allowNull: false },
  },
  { tableName }
);

module.exports = Users;
