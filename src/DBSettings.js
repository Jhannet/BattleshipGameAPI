const Sequelize = require('sequelize');
const sequelize = new Sequelize('BattleshipDB', 'sa', 'Jcj41994', {
  host: 'localhost',
  dialect: 'mssql',
  
  server: "DEV25JHJAWIN",
  domain: "DEV25JHJAWIN",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    encrypt: false
  },
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });