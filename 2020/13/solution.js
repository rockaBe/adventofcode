const getData = require('../helpers');

const parseInput = async (sample = null) =>
  getData(sample).then((data) =>
    data.split('\n')
      .filter(n => n));

// receives
// earliest: time of earliest departure (aka arrival)
// id: BusID and interval of departure
// returns next possible departure time
const calculateBusDeparture = (earliest, id) => Math.ceil(earliest / id) * id;

// receives an array of objects with
// @busId: <Integer>
// @nextDeparture: <Integer>
const pickNextBus = (arr) =>

  arr.reduce((memo, {busId, nextDeparture}) => {
    if (nextDeparture < memo.nextDeparture) {
      memo.busId = busId;
      memo.nextDeparture = nextDeparture;
    }
    return memo;
  }, { busId: null, nextDeparture: Infinity });

parseInput().then(data => {
  const part1Data = data.reduce((memo, el, idx) => {
    idx === 0
      ? memo.arrival = parseInt(el)
      : memo.departures = el.split(',').map(e => parseInt(e)).filter(n => n);
    return memo;
  }, {});
  const calculatedInput = part1Data.departures.map(dTime => ({
    busId: dTime,
    nextDeparture: calculateBusDeparture(part1Data.arrival, dTime)
  }));

  const result = pickNextBus(calculatedInput);
  console.log(`Part 1: busId: ${result.busId}, departure: ${result.nextDeparture} and result: ${result.busId * (result.nextDeparture - part1Data.arrival)}`);
});

const generateModuloLogic = (arrOfBusAndDelay) => {
  let t = null;
  const conditions = [];
  arrOfBusAndDelay.forEach(({ busId, increment }, idx) => {
    if (idx === 0) { t = busId; return; }
    else {
      conditions.push((arg) => {
        console.log('arg in condition func: ', arg);
       return (arg + increment) % busId === 0
      });
    }
  });
  return { t, conditions };
}

parseInput().then(data => {
  const part2Data = data[1].split(',').map((e, idx) => {
    if (e !== 'x') {
      return { busId: parseInt(e), increment: idx };
    }
  }).filter(n => n);

  const { t, conditions } = generateModuloLogic(part2Data);
  const theT = parseInt(t)
  let timestamp = theT;
  while (timestamp < Infinity) {
    if (conditions.every(el => {
      console.log('timestamp: ', timestamp);
      return el(timestamp);
    })) {
      break
    } else {
      timestamp += theT;
    }
  }
  console.log(`Part 2: timestamp is: ${timestamp}`);
});
