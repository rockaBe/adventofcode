// legend:
// `L`: empty seat
// `.`: floor (no rules apply)
// `#`: occupied seat

// constraintgs:
// in general:
// all decisions are based on the number of occupied seats adjacent to a given seat
//  0   1   2
//  3   X   4
//  5   6   7
// specific:
// 1) If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied
// 2) If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty
// 3) Otherwise, the seat's state does not change

// methods to be defined:

// adjacentSeats.occupiedCount() = get fields of adjacent seats [0,1,2,3,4,5,6,7]
// actually will return their status [.,#,#,L,L,#,#,.] or even better just the count of occupied seats

// getAreaState() = `hash` af the sum of all fields

// logic for the state change of a field:
// if seat === 'L' and adjacentSeats.occupiedCount === 0 => seat = '#'
// if seat === '#' and adjacentSeats.occupiedCount >= 4 => seat 'L'


const getData = require('../helpers');

const OCCU = '#';
const FREE = 'L';

const parseInput = async (sample = null) =>
  getData(sample).then((data) =>
    data.split('\n')
      .filter(n => n)
      .map((el) => el.split('')));

const areaStateChanged = (currentMap, previousMap) => currentMap.toString() !== previousMap.toString();

const adjacentSeatValues = (map, xCoord, yCoord) => {
  const width = map.length;
  let tl, l, bl, tr, r, br = null;
  if (xCoord - 1 >= 0) {
    tl = map[xCoord - 1][yCoord - 1];
    l = map[xCoord - 1][yCoord];
    bl = map[xCoord - 1][yCoord + 1];
  }
  const t = map[xCoord][yCoord - 1];
  const b = map[xCoord][yCoord + 1];

  if (xCoord + 1 < width) {
    tr = map[xCoord + 1][yCoord - 1];
    r = map[xCoord + 1][yCoord];
    br = map[xCoord + 1][yCoord + 1];
  }

  return [tl, t, tr, l, r, bl, b, br].filter(n => n);
}

const occupiedSeatsCount = (arr) => arr.filter(el => el === OCCU).length;

const adjacentOccupiedSeatsCount = (map, xCoord, yCoord) => occupiedSeatsCount(adjacentSeatValues(map, xCoord, yCoord));

parseInput().then(data => {
  let prevBoard = data;
  let newBoard;

  while (true) {
    newBoard = prevBoard.map(
      (row, rowIdx) => row.map(
        (cell, colIdx) => {
          const occSeats = adjacentOccupiedSeatsCount(prevBoard, rowIdx, colIdx);
          if (cell === FREE && occSeats === 0) { return OCCU }
          else if (cell === OCCU && occSeats >= 4) { return FREE }
          else { return cell }
        })
    );
    if (!areaStateChanged(prevBoard, newBoard)) { break }
    prevBoard = newBoard;
    newBoard = null;
  }
  console.log(occupiedSeatsCount(newBoard.flat()));
});
