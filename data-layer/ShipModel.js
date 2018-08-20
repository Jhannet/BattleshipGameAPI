const Sequelize = require('sequelize');
const DBConnection = require('./DBConnection');

const ShipModel = DBConnection.define('Ship', {
  boardId: {
    type: Sequelize.INTEGER,
    field: 'board_id'
  },
  orientation: {
    type: Sequelize.STRING,
    field: 'orientation'
  },
  typeShipId: {
    type: Sequelize.INTEGER,
    field: 'typeShipId',
    // validate: { min: 1, max: 4 }
  },
  positionX: {
    type: Sequelize.INTEGER,
    field: 'position_x',
    validate: { min: 0, max: 20 }
  },
  positionY: {
    type: Sequelize.INTEGER,
    field: 'position_y',
    validate: { min: 0, max: 20 }
  },
  timestamps: false,
});

ShipModel.sync();

module.exports = ShipModel;