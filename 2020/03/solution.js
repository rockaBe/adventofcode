const getData = require('../helpers');

const spinUpMatrix = () => getData().then(
  (data) => data.split('\n').filter(n => n)
    .map((line) => line.split(''))
);

const tree = '#';

const treeHunt = (steps) =>
  spinUpMatrix().then((data) =>
    steps.map(([r, d]) => {
      const width = data[0].length;
      let x = 0;
      let y = 0;
      let hits = 0;

      while (y < data.length - 1) {
        x = x + r;
        y = y + d;
        const modulo = x % width;
        if (data[y][modulo] === tree) {
          hits++;
        }
      };

      return hits;
    })
  );

const part1 = [[3,1]];
treeHunt(part1).then(trees => console.log(trees));

const part2 = [[1,1], [3,1], [5,1], [7,1], [1,2]];
treeHunt(part2).then(trees => {
  console.log(trees.reduce((m, cnt) => m * cnt, 1));
});

