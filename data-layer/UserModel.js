const Sequelize = require('sequelize');
const DBConnection = require('./DBConnection.js');

const UserModel = DBConnection.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});
DBConnection.sync()
  .then(() => UserModel.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

module.exports = UserModel;
