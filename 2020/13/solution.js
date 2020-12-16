const getData = require('../helpers');

const parseInput = async (sample = null) =>
  getData(sample).then((data) =>
    data.split('\n')
      .filter(n => n)
      .reduce((memo, el, idx) => {
        idx === 0
          ? memo.arrival = parseInt(el)
          : memo.departures = el.split(',').map(e => parseInt(e)).filter(n=>n);
        return memo;
      }, {})
    );

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
  const calculatedInput = data.departures.map(dTime => ({
    busId: dTime,
    nextDeparture: calculateBusDeparture(data.arrival, dTime)
  }));
  const result = pickNextBus(calculatedInput);
  console.log(`Part 1: busId: ${result.busId}, departure: ${result.nextDeparture} and result: ${result.busId * (result.nextDeparture - data.arrival)}`);
});
