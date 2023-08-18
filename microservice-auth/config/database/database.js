const {Sequelize} = require('sequelize')
// const models = require("../../src/models");
//TODO: Encriptar estas variables
const database = process.env.DB;
const username =  process.env.ADMIN;
const password = process.env.PASSWORD;

// console.log("base de datos: "+database)
const sequelize = new Sequelize(database, username, password, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  port: parseInt(process.env.PORTDB, 0),
});

// for (const modelDefiner of models) {
//   modelDefiner(sequelize);
// }

module.exports = sequelize;