'use strict';

const input = require('./input.js').honk;
// const input = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']; // => result: 4 (double) * 3 (triple) = 12

let doubleLetterCollection = 0;
let tripleLetterCollection = 0;

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
      charCountMapping[count] = [ value ];
    }
  });
  return charCountMapping;
}

function honk() {
  input.forEach((val) => {
    const result = countOfMostCharacters(val);
    const keyArray = Object.keys(result);
    for (let i=0; i<keyArray.length; i++) {
      if (keyArray[i].indexOf('2') >= 0) {
        doubleLetterCollection += 1;
      } else if (keyArray[i].indexOf('3') >= 0) {
        tripleLetterCollection += 1;
      };
    }
  });

  console.log('doubleLetterCollection: ', doubleLetterCollection);
  console.log('tripleLetterCollection: ', tripleLetterCollection);
  console.log(doubleLetterCollection * tripleLetterCollection);
};

module.exports = {
  honk
}