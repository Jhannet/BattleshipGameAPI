const maxCountShips = 5;
function shipsValidate({ships, game}) {
  const result = {success:true, errors:[]};
  if(ships.length > maxCountShips){
    result.success = false;
    result.errors.push('The max count ships is '+maxCountShips+' .');
    return result;
  }
  ships.forEach((ship, index) => {
    if(!isInBoard({ship, game})){
      result.errors.push('Ship number '+(index+1)+' is outside of the board.');
    }
  });
  if(result.errors.length > 0){
    result.success = false;
    return result;
  }
  return result;
}

function isInBoard({ship, game}) {
  if(ship.o === 'v'){
    if(ship.x + getCountOfType(ship.type) > game.rows){
      return false;
    }
  }else{
    if(ship.y + getCountOfType(ship.type) > game.columns){
      return false;
    }
  }
  return true;
}

function getCountOfType(type) {
  if(type === 2){
    return 2;
  }
  if(type === 3){
    return 3;
  }
  if(type === 4){
    return 4;
  }
  if(type === 5){
    return 5;
  }
}

module.exports = shipsValidate;