const log = message => {
  console.log(message);
};

const initialCommands = message => {
  console.log('TOY ROBOT PIN');
  console.log('\nPara começar, coloque o robô em um lugar válido, com o comando: "PLACE <x-coordinate>,<y-coordinate>,<direction>".');
  console.log('\nLista de comandos válidos:');
  console.log('PLACE <x-coordinate>,<y-coordinate>,<direction> - Coloca o robô nas coordenadas e na direção indicada.');
  console.log('RIGHT - Gira o robô para a direita, mudando a sua direção.');
  console.log('LEFT - Gira o robô para a esquerda, mundando a sua direção.');
  console.log('MOVE - Move o robô em uma unidade para a direção em que ele está indicado.');
  console.log('REPORT - Mostra as coordenadas e a direção atual do robô.\n');
}

module.exports = { log, initialCommands };
