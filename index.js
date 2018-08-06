const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Game = require('./src/game.js')

app.get('/game',(req, res) => {
  Game.join(req.query.token)
  .then(game => {
      res.send(game)
    })
  .catch(error => console.error(error))
})

app.get('/game/:gameId/:playerId', (req, res) => {
  const gameId = req.params.gameId;
  const playerId = req.params.playerId;
  console.log(playerId)
  Game.getGame({ gameId, playerId })
      .then(game => {
        console.log(game)
          res.send(game)            
      })
      .catch(err => {
          console.log(err)
          res.status(500).send({
              error: 'Game could not be found'
          })
      })
})

app.post('/game', (req, res) => {
  Game.create(req.body)
    .then(game => {
      res.send(game)
    })
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})


/*
  POST /game
  {
    "rows":
    "columns"
  }

  {
    "gameId": "http://localhost:3000/game?token=asdfasdfw23",
    "playerId": "asdfasdfasdf"
  }
*/

//folders: game-service
//files: GameService.js
