const commands = require('./commands.js');
const log = require('./log.js');

const initToyRobotApp = () => {
  let stdin = process.openStdin();
  let coordinate = [0, 0];
  let direction = '';
  let round = 0;

  stdin.addListener('data', function(data) {
    let command = data.toString().trim().toUpperCase();

    let isValid = commands.isValidCommand(round, command);

    if (isValid) {
      let verifyFistCommand = /PLACE\s\S{5}/.test(command);
      if (verifyFistCommand) {
        [newCoordinateX, newCoordinateY, newDirection, isValid] = commands.execute(command);

        if (isValid) {
          coordinate[0] = newCoordinateX;
          coordinate[1] = newCoordinateY;
          direction = newDirection;
          console.log(`O robô foi posicionado em: ${coordinate[0]},${coordinate[1]},${direction}. Utilize os comandos: MOVE, LEFT, RIGHT, REPORT ou "PLACE <x-coordinate>,<y-coordinate>,<direction>" para continuar a interação. `)
        }
      } else {
        [coordinate, direction] = commands.execute(command, coordinate, direction);
      }

      if (isValid) {
        round++;
      }
    }
  });
};

const init = () => {
  log.initialCommands();
  initToyRobotApp();
};

init();
