const fs = require('fs');

// used for both parts with different mapping functions
const rules = (mapFun) =>
  fs.readFileSync('./input.txt', 'utf-8').split('\n').filter(n => n)
    .map((rule) => {
      const split = rule.split('contain');
      const colorBag = split[0].replace(/\sbags\s/, '');
      const contains = split[1].split(',').map(mapFun)

      return { colorBag, contains };
    });

// mapping functions

// part 1: extract array of color strings
const extractColorStringArray = (bag) => {
  const match = bag.match(/\d+.(\w+\s\w+)/);
  if (match) { return match[1] }
};

// part 2: extract an object with keys number:<Integer> and color:<String>
const extractColorNumberObject = (bag) => {
  const match = bag.match(/([1-9]+).(\w+\s\w+)/);
  if (match) {
    return { number: match[1], color: match[2] }
  }
  return { color: bag, number: 0 }
};

// receives an array of color strings
const getColorBags = (bags) => {
  const colorBags = bags.map(bag =>
    rules(extractColorStringArray).filter((rule) => rule.contains.includes(bag))
      .map(rule => rule.colorBag)).flat();

  if (colorBags.length === 0) return null;

  const allColorBags = [colorBags, getColorBags(colorBags)].flat()
    .filter(
      (color, index, array) => !!color && array.indexOf(color) === index
    );
  return allColorBags;
};

const getFlatLength = (bags) => getColorBags(bags).flat().length;

// receives an object with keys :number and :color
const getAllNeededBags = (bag) => {
  const colorBags = rules(extractColorNumberObject).filter((rule) => rule.colorBag === bag.color)
  .map(rule => rule.contains).flat()
  .filter(rule => rule.number != 0);

  if (colorBags.length === 0) return 0;

  return colorBags.map((rule) =>
    parseInt(rule.number) + parseInt(rule.number*getAllNeededBags(rule)))
    .reduce((memo, count) => memo + count, 0);
};

// number of bag colors that can eventually
// contain at least 1 bag of color: shiny gold
const part1 = getFlatLength(['shiny gold']);
console.log(part1);

// number of bags required inside my shiny golden bag
const part2 = getAllNeededBags({color: 'shiny gold', number: 1});
console.log(part2)
