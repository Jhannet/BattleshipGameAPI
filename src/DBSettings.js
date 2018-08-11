const Sequelize = require('sequelize');
const sequelize = new Sequelize('BattleshipDB', 'sa', 'Abc123', {
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
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
  });
  
  sequelize.sync()
    .then(() => User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    }))
    .then(jane => {
      console.log(jane.toJSON());
    });

module.exports = sequelize;