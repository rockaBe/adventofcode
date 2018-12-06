'use strict';

const input = require('./input.js').honk;
const rows = 1000;
let fabric = create2DArray(rows);

function create2DArray(rows) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function populateFabric(obj) {
  for (let i = obj.leftOffset; i < (obj.leftOffset + obj.width); i++) {
    for (let j = obj.topOffset; j < (obj.topOffset + obj.height); j++) {
      let elem = fabric[i][j];
      if (!elem) {
        fabric[i][j] = [obj.id];
      } else {
        fabric[i][j].push(obj.id);
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

function extractNoOverlap() {
  let map = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      // check that there is an non empty array
      if (Array.isArray(fabric[i][j]) && fabric[i][j].length) {
        if (fabric[i][j].length === 1) {
          map.push({ left: i, top: j, id: fabric[i][j].join('') });
        }
      }
    }
  }
  return map;
}

function honk() {
  const formattedInput = formatInput(input);
  formattedInput.forEach(populateFabric);
  const res = extractNoOverlap();
  let uniqueIdsWithSoliSlots = {};
  res.forEach((obj) => {
    if (uniqueIdsWithSoliSlots[obj.id]) {
      uniqueIdsWithSoliSlots[obj.id] += 1;
    } else {
      uniqueIdsWithSoliSlots[obj.id] = 1;
    }
  });

  Object.keys(uniqueIdsWithSoliSlots).forEach((id) => {
    const field = formattedInput.filter((obj) => {  
      if (obj.id === parseInt(id)) {
        return obj;
      } 
    })[0];
    if (uniqueIdsWithSoliSlots[id] === field.width * field.height) {
      console.log('not overlapping claim id: #', id);
    }
  });
}

module.exports = {
  honk
};