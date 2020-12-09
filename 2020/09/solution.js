const getData = require('../helpers');

const parseInput = async () =>
  getData().then((data) =>
    data.split('\n').filter(n => n)
      .map(val => parseInt(val)));

const sumAll = (arr) => {
  const sums = [];
  for (let i=0; i < arr.length-1; i++) {
    for (let j=i+1; j < arr.length; j++) {
      sums.push(arr[i]+arr[j]);
    }
  }
  return sums;
};

const iterate = (arr, preamble=25) => {
  let index = 0;
  let candidate;
  while (index < arr.length-1) {
    const target = arr[preamble];
    if (!sumAll(arr.slice(index, preamble)).includes(target)) {
      candidate = target
      break;
    }
    index++; preamble++;
  }
  return candidate;
}

parseInput().then(data => console.log(iterate(data, 25)));


