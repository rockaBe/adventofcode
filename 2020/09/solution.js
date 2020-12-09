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

const sumArr = (idcs, arr) =>
  idcs.reduce((memo, idx) => memo + arr[idx], 0);

const sumOfMinAndMax = (arr) =>
  Math.max(...arr) + Math.min(...arr);

const sumUpTo = (arr, target) => {
  let summandIndices = [];
  for (let i=0; i<arr.length; i++) {
    summandIndices.push(i);
    const interSum = sumArr(summandIndices, arr);
    // success case
    if (summandIndices.length > 1 && interSum === target) { break; }
    // reset index and list of indices
    if (interSum > target) {
      i = summandIndices[0];
      summandIndices = [];
    }
  }
  return [summandIndices, sumOfMinAndMax(summandIndices.map(i => arr[i]))];
}

const findInvalid = (arr, preamble=25) => {
  let index = 0;
  let candidate;
  while (index < arr.length-1) {
    const target = arr[preamble];
    const options = arr.slice(index, preamble);
    if (!sumAll(options).includes(target)) {
      candidate = target;
      break;
    }
    index++; preamble++;
  }
  return candidate;
};

parseInput().then(data => {
  const part1 = findInvalid(data, 25);
  console.log('Solution part 1: ', part1);
  console.log('Solution part 2: ', sumUpTo(data, part1));
});


