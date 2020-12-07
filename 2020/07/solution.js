const { count } = require('console');
const fs = require('fs');

const rules = fs.readFileSync('./input.txt', 'utf-8').split('\n').filter(n => n)
  .map((rule) => {
    const split = rule.split('contain');
    const colorBag = split[0].replace(/\sbags\s/, '');
    const contains = split[1].split(',').map(
      bag => {
        const match = bag.match(/\d+.(\w+\s\w+)/);
        if (match) { return match[1] }
      }
    );
    console.log('::: ', { colorBag, contains });
    return { colorBag, contains };
  });

const getColorBags = (bags) => {
  const colorBags = bags.map(bag =>
    rules.filter((rule) => {
      // console.log('rule.contains: ', rule.contains);
      return rule.contains.includes(bag)
    })
      .map(rule => rule.colorBag)).flat();

  if (colorBags.length === 0) return null;

  const allColorBags = [
    colorBags,
    getColorBags(colorBags)
  ]
    .flat()
    .filter(
      (n, i, a) => !!n && a.indexOf(n) === i
    );
  return allColorBags;
};

const part1 = getColorBags(['shiny gold']).flat().length;
console.log('PART 1:');
console.log('number of bag colors that can eventually contain at least 1 bag of color: shiny gold');
console.log(part1);

const rules2 = fs.readFileSync('./input.txt', 'utf-8').split('\n').filter(n => n)
  .map((rule) => {
    const split = rule.split('contain');
    const colorBag = split[0].replace(/\sbags\s/, '');
    const contains = split[1].split(',').map(
      bag => {
        const match = bag.match(/([1-9]+).(\w+\s\w+)/);
        if (match) {
          return { number: match[1], color: match[2] }
        } else {
          return { color: bag, number: 0 }
        }
      }
    );
    return { colorBag, contains };
  }).filter(n => n);

const getAllNeededBags = (bag) => {
  const colorBags = rules2.filter((rule) => rule.colorBag === bag.color)
  .flat()
  .map(rule => rule.contains)
  .flat()
  .filter(rule => rule.number != 0);

  if (colorBags.length === 0) return 0;

  return colorBags.map((rule) =>
    parseInt(rule.number) + parseInt(rule.number*getAllNeededBags(rule)))
    .reduce((memo, count) => memo + count, 0);
};

const part2 = getAllNeededBags({color: 'shiny gold', number: 1});
console.log('PART 2:');
console.log('number of bags required inside my shiny golden bag:');
console.log(part2)
