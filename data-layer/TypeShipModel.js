const Sequelize = require('sequelize');
const DBConnection = require('./DBConnection');

const TypeShipModel = DBConnection.define('TypeShip', {
  type: {
    type: Sequelize.INTEGER,
    field: 'type'
  },
  playerId: {
    name: Sequelize.STRING,
    field: 'name'
  },
});
TypeShipModel.sync();
const type2 = TypeShipModel.build({type: 2, name: 'Boat'});
type2.save();
const type3 = TypeShipModel.build({type: 3, name: 'Ship'});
type3.save();
const type4 = TypeShipModel.build({type: 4, name: 'Submarine ship'});
type4.save();
const type5 = TypeShipModel.build({type: 5, name: 'Aircraft carrier'});
type5.save();

module.exports = TypeShipModel;