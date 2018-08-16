const GameModel = require('../data-layer/GameModel');
const idHelper = require('./IdHelper.js')

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
	    	game.session = `http://localhost:3000/game?token=${token}`;
        return {
          id : game.id, 
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
				return {
					id : gameUpdated.id,
					playerId : gameUpdated.playerId_2,
				};
			})
			.catch(error => {
				console.error(error);
				throw(error);
			});
	}

	static getGame({ gameId, playerId }) {
    return GameModel.findById(gameId)
      .then(result => {
				const game = result.dataValues;
        if(game.playerId_1 === playerId) {
          delete game.playerId_2;
        }else{
          delete game.playerId_1;
        }
        return game;
      })
      .catch(error => {
        console.error(error);
        throw(error);
      });
	}
}

module.exports = Game