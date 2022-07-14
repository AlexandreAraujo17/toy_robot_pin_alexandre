const log = require('./log.js');
const NORTH = 'N';
const SOUTH = 'S';
const EAST = 'E';
const WEST = 'W';

const getDirectionName = code => {
  switch (code) {
    case NORTH:
      return 'NORTH';
    case SOUTH:
      return 'SOUTH';
    case EAST:
      return 'EAST';
    case WEST:
      return 'WEST';
  }
};

const getNewDirection = (currentDirection, command) => {
  const directions = [NORTH, EAST, SOUTH, WEST];
  let currentRobotDirection = directions.indexOf(currentDirection);

  switch (command) {
    case 'LEFT':
      currentRobotDirection--;
      break;
    case 'RIGHT':
      currentRobotDirection++;
      break;
  }

  if (currentRobotDirection < 0) return WEST;
  if (currentRobotDirection > 3) return NORTH;

  return directions[currentRobotDirection];
};

const getNewCoordinate = (currentCoordinate, currentDirection) => {
  switch (currentDirection) {
    case NORTH:
      currentCoordinate[1] = parseInt((parseInt(currentCoordinate[1]) + 1).toString());
      return currentCoordinate;
    case SOUTH:
      currentCoordinate[1] = parseInt((parseInt(currentCoordinate[1]) - 1).toString());
      return currentCoordinate;
    case WEST:
      currentCoordinate[0] = parseInt((parseInt(currentCoordinate[0]) - 1).toString());
      return currentCoordinate;
    case EAST:
      currentCoordinate[0] = parseInt((parseInt(currentCoordinate[0]) + 1).toString());
      return currentCoordinate;
  }
};


const isValidDirection = direction => {
  const result = [NORTH, SOUTH, EAST, WEST].indexOf(direction) !== -1;
  if (!result) {
    log.log(`Digitar uma das direções válidas: N, S, E, W`);
  }
  return result;
};

module.exports = { getDirectionName, getNewDirection, getNewCoordinate, isValidDirection };
