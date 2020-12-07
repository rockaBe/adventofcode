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
