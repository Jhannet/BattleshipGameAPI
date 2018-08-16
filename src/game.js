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
      .then(jane => {
        console.log(jane.toJSON());
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
    return GameModel.findOne({
        where: {
          token: token
        }
			})
			.then(game => {
				game.playerId_2 = idHelper();
				return GameModel.update(
					{player_id_2:game.playerId_2},
          
          
          {where:{id:game.id}}
				);
				//dbGame[game.id] = game;
			})
			.then(game => {
				return {
					id : game.id,
					playerId : game.playerId_2,
				}
			})
			.catch(error => {
				console.log(error);
				throw(error);
			});
			/*
		if(game === undefined) {
			return Promise.reject()		
		}
		game.playerId_2 = idHelper();
		dbGame[game.id] = game;
		return Promise.resolve({
			id : game.id,
			playerId : game.playerId_2,
		});*/
	}

	static getGame({ gameId, playerId }) {
    const game  = GameModel.findById(gameId);
    /*return GameModel.findById(gameId)
      .then(game => {
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
      });*/
		if(game === undefined) {
			return Promise.reject()		
		}
		if(game.playerId_1 === playerId) {
          delete game.playerId_2;
        }else{
          delete game.playerId_1;
        }
		return Promise.resolve(game);
	}
}

module.exports = Game