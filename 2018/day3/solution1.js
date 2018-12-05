'use strict';

const input = require('./input.js').honk;
const rows = 1000;
// const input = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];  // => 4
// const rows = 10;
let fabric = create2DArray(rows);

function create2DArray(rows) {
  let arr = [];

  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

function populateFabric(obj) {
  for (let i = obj.leftOffset; i<(obj.leftOffset + obj.width); i++) {
    for (let j = obj.topOffset; j<(obj.topOffset + obj.height); j++) {
      let elem = fabric[i][j];
      if (!elem) {
        fabric[i][j] = 1;
      }
      else {
        fabric[i][j] += 1;
      }
    }
  }
}

function formatInput(array) {
  return array.map((value) => {
    let [_, id, leftOffset, topOffset, width, height] = (/#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/).exec(value);
    return { 
      id: parseInt(id), 
      leftOffset: parseInt(leftOffset),
      topOffset: parseInt(topOffset), 
      width: parseInt(width), 
      height: parseInt(height)
    };
  })
}

function extractOverlap() {
  let map = [];
  for (let i=0; i<rows; i++) {
    for (let j=0; j<rows; j++) {
      if (parseInt(fabric[i][j]) > 1) {
        map.push([i,j]);
      }
    }
  }
  return map;
}

function honk() {
  formatInput(input).forEach(populateFabric);
  const res = extractOverlap();
  console.log('solution: ', Math.sqrt(res.length));
  console.log('solution: ', res.length);
}

module.exports = {
  honk
};