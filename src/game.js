const GameModel = require('../data-layer/GameModel');
const BoardModel = require('../data-layer/BoardModel');
const ShipModel = require('../data-layer/ShipModel');
const idHelper = require('./IdHelper.js');
const ShipsValidate = require('./ShipsValidate.js');

class Game {
	constructor({columns = 10, rows = 10} = {}){
		this.columns = columns;
		this.rows = rows;
	}
	static create({columns = 10, rows = 10} = {}) {
		const game = new Game({columns,rows});
		game.playerId_1 = idHelper();
		const token = idHelper();
		game.token = token
		
		return GameModel.create(game)
      .then(res => {
				const gameCreated = res.dataValues;
	    	game.session = `http://localhost:3000/game?token=${token}`;
				return BoardModel.create({
					gameId: gameCreated.id, 
					playerId: game.playerId_1
				});
			})
			.then(res => {
				const board = res.dataValues;
				return {
          id : board.gameId, 
          session : game.session,
          playerId : game.playerId_1
				}
			})
      .catch(error => {
        console.error(error);
        throw(error);
      });
	}

	static join(token) {
		return GameModel.findOne({where:{token: token}})
			.then(result => {
				const playerId_2 = idHelper();
				return result.update({playerId_2: playerId_2});
			})
			.then(resultUpdated => {
				const gameUpdated = resultUpdated.dataValues;
				return BoardModel.create({
					gameId: gameUpdated.id, 
					playerId: gameUpdated.playerId_2
				});
				
			})
			.then(result => {
				const board = result.dataValues;
				return {
					id : board.id,
					playerId : board.playerId,
				};
			})
			.catch(error => {
				console.error(error);
				throw(error);
			});
	}

	static shipsPosition({ gameId, playerId, ships }) {
    return GameModel.findById(gameId)
      .then(result => {
				const game = result.dataValues;
				const resultValidation = ShipsValidate({ ships, game });
				if(resultValidation.success){
				  return BoardModel.findOne({
						where:{gameId:gameId, playerId: playerId}
					});
				}
				console.log(resultValidation)
				return Promise.reject(resultValidation.errors);
			})
			.then(resultBoard => {
				const board = resultBoard.dataValues;
				const promises = [];
				ships.forEach(ship => {
					promises.push(ShipModel.create({
						boardId: board.id,
						orientation: ship.o,
					  typeShipId: ship.type,
				    positionX: ship.x,
						positiony: ship.y,
		    	}));
				});
				return Promise.all(promises);
			})
			.then(() => {
				return {message: 'Ships created'};
			})
      .catch(error => {
        console.error(error);
        throw(error);
      });
	}
}

module.exports = Game