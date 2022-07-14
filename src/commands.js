const directions = require('./directions');
const log = require('./log.js');

const execute = (command, coordinate = null, direction = null) => {
  switch (true) {
    case command === 'LEFT':
      direction = directions.getNewDirection(direction, command);
      break;
    case command === 'RIGHT':
      direction = directions.getNewDirection(direction, command);
      break;
    case command === 'REPORT':
      let result = coordinate[0] + ',' + coordinate[1] + ',' + directions.getDirectionName(direction);
      log.log(`\nPosição atual do seu robô: ${result}\n`);
      log.log('Continue digitando outros comandos:\n');
      break;
    case /PLACE\s\S{5}/.test(command):
      let subCommand = command.split(' ')[1];
      let splitSubCommand = subCommand.split(',');
      let xCoordinate = splitSubCommand[0];
      let yCoordinate = splitSubCommand[1];
      let newDirection = splitSubCommand[2];
      let x = parseInt(xCoordinate) >= 0 && parseInt(xCoordinate) < 5;
      let y = parseInt(yCoordinate) >= 0 && parseInt(yCoordinate) < 5;
      let isValid = x && y && directions.isValidDirection(newDirection);

      if(!x || !y){
        log.log(`Você não pode colocá-lo na coordenada [${coordinate[0]},${coordinate[1]}] ou então o robô irá cair!`);
      }

      return [parseInt(xCoordinate), parseInt(yCoordinate), newDirection, isValid];
    case command === 'MOVE':
      let temporaryCoordinate = coordinate.slice(0);
      let savedCoordinate = directions.getNewCoordinate(temporaryCoordinate, direction);
      let xCoord = parseInt(savedCoordinate[0]) >= 0 && parseInt(savedCoordinate[0]) < 5;
      let yCoord = parseInt(savedCoordinate[1]) >= 0 && parseInt(savedCoordinate[1]) < 5;
      if (xCoord && yCoord) {
        coordinate = savedCoordinate;
      }
      break;
    
  }

  return [coordinate, direction];
};

const isValidCommand = (round, command) => {
  let isValid = true;
  let verifyPatternIsNotValid = /PLACE\s\S{5}|MOVE|LEFT|RIGHT|REPORT/.test(command) === false;
  let verifyFirstCommandIsNotValid = round === 0 && /PLACE\s\S{5}/.test(command) === false;

  if (verifyFirstCommandIsNotValid) {
    log.log('O primeiro comando deve ser: "PLACE <x-coordinate>,<y-coordinate>,<direction>"');
    isValid = false;
  } else if (verifyPatternIsNotValid) {
    log.log('Comando inválido! Insira um dos comandos válidos: PLACE, MOVE, LEFT, RIGHT, REPORT');
    isValid = false;
  }

  return isValid;
};


module.exports = { isValidCommand, execute };
