const express = require('express');
const bodyParser = require('body-parser');
const DBConnection = require('./data-layer/DBConnection');
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
  .catch(error => {
    console.error(error);
    res.status(400).send({
      message: 'Could not join the game'
    })
  })
})

app.get('/game/:gameId/player/:playerId', (req, res) => {
  const { gameId, playerId }  = req.params;
  Game.getGame({ gameId, playerId })
      .then(game => {
        res.send(game)            
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({
          message: 'Game could not be found'
        })
      })
})

app.post('/game', (req, res) => {
  Game.create(req.body)
    .then(game => {
      res.send(game)
    })
    .catch(error => {
      console.error(err)
      res.status(400).send({
        message: 'Game could not be created'
      })
    })
})

app.on('DBReady', function() { 
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!'); 
  }); 
}); 

DBConnection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    const GameModel = require('./data-layer/GameModel');
    DBConnection.sync();
    app.emit('DBReady');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', err);
    res.status(400).send({
      message: error
    })
  });



