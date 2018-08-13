const Sequelize = require('sequelize');
/*
const DBConnection = new Sequelize('BattleshipDB', 'sa', 'Abc123', {
  host: 'localhost',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    encrypt: false
  },
  storage: './data.mssql',
  operatorsAliases: false
});*/
const DBConnection = new Sequelize('BattleshipDB', null, null, {
  dialect: "sqlite",
  storage: '../db/BattleshipDB.db',
});

module.exports = DBConnection;