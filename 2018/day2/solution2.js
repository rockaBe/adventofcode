'use strict';

const input = require('./input.js').honk;

function countOfMostCharacters(str) {
  const charCountMapping = {};
  const characters = str.split('');
  characters.forEach((value, index, array) => {
    const count = array.reduce((memo, v) => {
      return value === v ? memo + 1 : memo;
    }, 0);
    if (!!charCountMapping[count]) {
      charCountMapping[count].push(value);
    } else {
      charCountMapping[count] = [value];
    }
  });
  return charCountMapping;
}

function inExpectedDistance(comparer, comparee) {
  const distance = comparee.split('').filter((value, index) => {
    return comparer[index] !== value;
  }).length;
  return (distance != 0 && distance < 2) ? true : false;
}

function honk() {
  let result = input.map((value) => {
    if (Object.keys(countOfMostCharacters(value)).filter((val) => val === '3' || val === '2')) {
      return value;
    }
  })
  .map((value, _index, array) => {
    let interim = {};
    for (let i=0; i<array.length; i++) {
      if (inExpectedDistance(value, array[i])) {
        if (!interim[value]) {
          interim[value] = [array[i]];
        } else {
          interim[value].push(array[i]);
        }
      }
    }
    if (interim[value]) return interim;
    return null;
  })
  .filter((obj) => obj);

  console.log('result: ', result);
  console.log('result.length: ', result.length);
}

module.exports = {
  honk
}