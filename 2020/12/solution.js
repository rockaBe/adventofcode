const getData = require('../helpers');

const reg = /(\w)(\d+)/;

const parseInput = async (sample = null) =>
  getData(sample).then((data) =>
    data.split('\n')
      .filter(n => n)
      .map(el => {
        const [_, action, units] = el.match(reg);
        return { action, units: parseInt(units) }
      }));

const calculateManhattanDistance = (instructions) => {
  let currentDirection = 'E';
  const distances = { N: 0, S: 0, E: 0, W: 0 };
  const turns = ['N', 'E', 'S', 'W'];
  const degrees = [90, 180, 270];

  const setCurrentForR = (currDir, instrValue) =>
    turns[(turns.indexOf(currDir) + (degrees.indexOf(instrValue) + 1) + 4) % 4];
  const setCurrentForL = (currDir, instrValue) =>
    turns[(turns.indexOf(currDir) - (degrees.indexOf(instrValue) + 1) + 4) % 4];

  instructions.forEach(({ action, units }) => {
    if (action === 'R') {
      currentDirection = setCurrentForR(currentDirection, units);
    } else if (action === 'L') {
      currentDirection = setCurrentForL(currentDirection, units);
    } else if (action === 'F') {
      distances[currentDirection] += units;
    } else {
      distances[action] += units;
    }
  })

  const manhattanDistance = Math.abs(distances.N - distances.S) + Math.abs(distances.E - distances.W);
  return manhattanDistance;
};

parseInput().then(data => console.log(calculateManhattanDistance(data)));
