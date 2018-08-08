const dbGame = []
const idHelper = require('./IdHelper.js')

class Game {
	constructor({columns = 10, rows = 10} = {}){
		this.columns = columns;
		this.rows = rows;
	}
	static create({columns = 10, rows = 10} = {}) {
		const game = new Game({columns,rows});
		game.id = dbGame.length + 1;
		game.playerId_1 = idHelper();
		const token = idHelper();
		game.token = token
		dbGame.push(game);
		game.session = `http://localhost:3000/game?token=${token}`;

		return Promise.resolve({
			id : game.id, 
			session : game.session,
			playerId : game.playerId_1
		})
	}

	static join(token) {
		const game = dbGame.find(game => game.token === token);
		if(game === undefined) {
			return Promise.reject()		
		}
		game.playerId_2 = idHelper();
		dbGame[game.id] = game;
		return Promise.resolve({
			id : game.id,
			playerId : game.playerId_2,
		});
	}

	static getGame({ gameId, playerId }) {
		const game  = dbGame[gameId-1];
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