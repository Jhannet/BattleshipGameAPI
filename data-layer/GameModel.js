const Sequelize = require('sequelize');
const DBConnection = require('./DBConnection');

const GameModel = DBConnection.define('Game', {
  token: {
    type: Sequelize.STRING,
    field: 'token'
  },
  playerId_1: {
    type: Sequelize.STRING,
    field: 'player_id_1'
  },
  playerId_2: {
    type: Sequelize.STRING,
    field: 'player_id_2'
  },
  columns: {
    type: Sequelize.INTEGER,
    field: 'columns',
    validate: { min: 10, max: 30 }
  },
  rows: {
    type: Sequelize.INTEGER,
    field: 'rows',
    validate: { min: 10, max: 30 }
  },
  });

module.exports = GameModel;