const Sequelize = require("sequelize");
const sequelize = require("../db");

const tableName = "File";

const File = sequelize.define(
  "File",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

    otp: { type: Sequelize.STRING, allowNull: false },

    email: { type: Sequelize.STRING, allowNull: false },
  },
  {
     timestamps: {
        createdAt: 'created_at',
        updatedAt: 'upload_at'
     }
    
},
  { tableName }
);

module.exports =  File ;
