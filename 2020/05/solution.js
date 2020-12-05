const getData = require('../helpers');

const part1 = () =>
  getData().then((data) =>
    Math.max(...data
      .split('\n')
      .filter(n => n)
      .map((pass) => calculateSeatId(pass))
  ));

const calculateSeatId = (pass) => {
  const replacers = { 'B': 1, 'F': 0, 'R': 1, 'L': 0 };
  const binary = pass.replace(/[BFRL]/g, m => replacers[m]);
  const row = parseInt(binary.substr(0, 7), 2);
  const seat = parseInt(binary.substr(7), 2);
  return 8 * row + seat;
};

part1().then((result) => console.log('part1:: max SeatId: ', result));

const part2 = () =>
  getData().then((data) => {
    const sortedSeats = data
      .split('\n')
      .filter(n => n)
      .map((pass) => calculateSeatId(pass))
      .sort((a, b) => a - b);
    let mySeatId;
    sortedSeats.forEach((el, idx) => {
      const nextId = sortedSeats[idx+1];
      if (nextId && nextId - el === 2) { mySeatId = el+1 };
    })
    return mySeatId;
  });

part2().then(result => console.log('part2:: mySeatId: ', result));
