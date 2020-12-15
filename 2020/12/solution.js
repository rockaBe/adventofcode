const getData = require('../helpers');

const reg = /(\w)(\d+)/;
const turns = ['N', 'E', 'S', 'W'];
const degrees = [90, 180, 270];

const setCurrentForR = (currDir, instrValue) =>
  turns[(turns.indexOf(currDir) + (degrees.indexOf(instrValue) + 1) + 4) % 4];

const setCurrentForL = (currDir, instrValue) =>
  turns[(turns.indexOf(currDir) - (degrees.indexOf(instrValue) + 1) + 4) % 4];

const parseInput = async (sample = null) =>
  getData(sample).then((data) =>
    data.split('\n')
      .filter(n => n)
      .map(el => {
        const [_, action, units] = el.match(reg);
        return { action, units: parseInt(units) }
      }));

const part1 = (instructions) => {
  let currentDirection = 'E';
  const distances = { N: 0, S: 0, E: 0, W: 0 };

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
  });
  return Math.abs(distances.N - distances.S) + Math.abs(distances.E - distances.W);
};

const part2 = (instructions) => {
  const location = { N: 0, E: 0, S: 0, W: 0 }
  const waypoint = [['E', 10], ['N', 1]]

  instructions.forEach(({ action, units }) => {
    if (action === 'R') {
      waypoint[0][0] = setCurrentForR(waypoint[0][0], units);
      waypoint[1][0] = setCurrentForR(waypoint[1][0], units);
    } else if (action === 'L') {
      waypoint[0][0] = setCurrentForL(waypoint[0][0], units);
      waypoint[1][0] = setCurrentForL(waypoint[1][0], units);
    } else if (action === 'F') {
      location[waypoint[0][0]] += waypoint[0][1] * units;
      location[waypoint[1][0]] += waypoint[1][1] * units;
    } else {
      if (action === 'N') {
        for (let dir of waypoint) {
          if (dir[0] === 'N') dir[1] += units
          if (dir[0] === 'S') dir[1] -= units
        }
      }
      if (action === 'S') {
        for (let dir of waypoint) {
          if (dir[0] === 'S') dir[1] += units
          if (dir[0] === 'N') dir[1] -= units
        }
      }
      if (action === 'E') {
        for (let dir of waypoint) {
          if (dir[0] === 'E') dir[1] += units
          if (dir[0] === 'W') dir[1] -= units
        }
      }
      if (action === 'W') {
        for (let dir of waypoint) {
          if (dir[0] === 'W') dir[1] += units
          if (dir[0] === 'E') dir[1] -= units
        }
      }
    }
  });
  return Math.abs(location.N - location.S) + Math.abs(location.E - location.W);
}

parseInput().then(data => console.log('Part 1: ', part1(data)));
parseInput().then(data => console.log('Part 2: ', part2(data)));
