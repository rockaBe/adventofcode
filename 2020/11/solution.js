const getData = require('../helpers');

const OCCU = '#';
const FREE = 'L';

const parseInput = async (sample = null) =>
  getData(sample).then((data) =>
    data.split('\n')
      .filter(n => n)
      .map((el) => el.split('')));

const areaStateChanged = (currentMap, previousMap) => currentMap.toString() !== previousMap.toString();
const occupiedSeatsCount = (arr) => arr.filter(el => el === OCCU).length;

const adjacentSeatValues = (map, xCoord, yCoord) => {
  const width = map.length;
  let tl, l, bl, tr, r, br = null;
  if (xCoord-1 >= 0) {
    tl = map[xCoord-1][yCoord-1];
    l = map[xCoord-1][yCoord];
    bl = map[xCoord-1][yCoord+1];
  }
  const t = map[xCoord][yCoord-1];
  const b = map[xCoord][yCoord+1];

  if (xCoord+1 < width) {
    tr = map[xCoord+1][yCoord-1];
    r = map[xCoord+1][yCoord];
    br = map[xCoord+1][yCoord+1];
  }

  return [tl, t, tr, l, r, bl, b, br].filter(n => n);
}

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
  console.log('PART 1: ', occupiedSeatsCount(newBoard.flat()));
});

const noSeenValueYet = (el) => !el || el === '.';

const visibleSeatValues = (map, yCoord, xCoord) => {
  const width = map.length;
  const height = map[0].length;
  const value = map[xCoord][yCoord];
  const checker = yCoord === 2 && xCoord === 2;
  let tl, l, bl, tr, r, br, t, b = null;
  let tmpXCoord = xCoord;
  let tmpYCoord = yCoord;

  while (tmpYCoord-1 >= 0 && tmpXCoord-1 >= 0 && noSeenValueYet(tl)) {
    tl = map[tmpXCoord-1][tmpYCoord-1];
    tmpXCoord--; tmpYCoord--;
  };

  tmpXCoord = xCoord; tmpYCoord = yCoord;
  while (tmpXCoord-1 >= 0 && noSeenValueYet(l)) {
    l = map[tmpXCoord-1][tmpYCoord];
    tmpXCoord--;
  }

  tmpXCoord = xCoord; tmpYCoord = yCoord;
  while (tmpXCoord-1 >= 0 && tmpYCoord+1 < height && noSeenValueYet(bl)) {
    bl = map[tmpXCoord-1][tmpYCoord+1];
    tmpXCoord--; tmpYCoord++;
  };

  tmpXCoord = xCoord; tmpYCoord = yCoord;
  while (tmpXCoord+1 < width && tmpYCoord-1 >= 0 && noSeenValueYet(tr)) {
    tr = map[tmpXCoord+1][tmpYCoord-1];
    tmpXCoord++; tmpYCoord--;
  };

  tmpXCoord = xCoord; tmpYCoord = yCoord;
  while (tmpXCoord+1 < width && noSeenValueYet(r)) {
    r = map[tmpXCoord+1][tmpYCoord];
    tmpXCoord++;
  }

  tmpXCoord = xCoord; tmpYCoord = yCoord;
  while (tmpXCoord+1 < width && tmpYCoord+1 < height && noSeenValueYet(br)) {
    br = map[tmpXCoord+1][tmpYCoord+1];
    tmpXCoord++; tmpYCoord++;
  };

  tmpXCoord = xCoord; tmpYCoord = yCoord;
  while (tmpYCoord-1 >= 0 && noSeenValueYet(t)) {
    t = map[tmpXCoord][tmpYCoord-1];
    tmpYCoord--;
  }

  tmpXCoord = xCoord; tmpYCoord = yCoord;
  while (tmpYCoord+1 < height && noSeenValueYet(b)) {
    b = map[tmpXCoord][tmpYCoord+1];
    tmpYCoord++;
  }

  return [tl, t, tr, l, r, bl, b, br].filter(n => n);
}

const seenOccupiedSeatsCount = (map, xCoord, yCoord) => occupiedSeatsCount(visibleSeatValues(map, xCoord, yCoord));

parseInput().then(data => {
  let prevBoard = data;
  let newBoard;

  while (true) {
    newBoard = prevBoard.map(
      (row, rowIdx) => row.map(
        (cell, colIdx) => {
          const occSeats = seenOccupiedSeatsCount(prevBoard, colIdx, rowIdx);
          if (cell === FREE && occSeats === 0) { return OCCU }
          else if (cell === OCCU && occSeats >= 5) { return FREE }
          else { return cell }
        })
    );
    if (!areaStateChanged(prevBoard, newBoard)) { break }
    prevBoard = newBoard;
    newBoard = null;
  }
  console.log('PART 2: ', occupiedSeatsCount(newBoard.flat()));
});
