const Sequelize = require('sequelize');
const DBConnection = require('./DBConnection');

const BoardModel = DBConnection.define('Board', {
  gameId: {
    type: Sequelize.INTEGER,
    field: 'game_id'
  },
  playerId: {
    type: Sequelize.STRING,
    field: 'player_id'
  },
});

BoardModel.sync();
module.exports = BoardModel;