'use strict';

const examples = [
  { puzzle: 1122, result: 3 },
  { puzzle: 1111, result: 4 },
  { puzzle: 1234, result: 0 },
  { puzzle: 91212129, result: 9 }
];

function splitIntoPairsToCompare(puzzle) {
  return splitNumberIntoArrayOfNumbers(puzzle).map(function(value, index, arr) {
    const nextItemPos = (index + 1) < arr.length ? (index + 1) : 0; 
    return value === arr[nextItemPos] ? value : 0;
  }).reduce((memo, value) => memo + value);
}

function splitNumberIntoArrayOfNumbers(num) {
  return (num).toString(10).split("").map(function (t) {
    return parseInt(t)
  })
}

function honk() {
  examples.forEach(function(object) {
    const result = splitIntoPairsToCompare(object.puzzle);
    console.log('object.result === splitIntoPairsToCompare(object.puzzle ' + result + ') ::', object.result === result);
  });
}

module.exports = {
  honk
}

