const getData = require('../helpers');

const spinUpMatrix = () => getData().then(
  (data) => data.split('\n').filter(n => n)
    .map((line) => line.split(''))
);

const tree = '#';

const treeHunt = (steps) =>
  spinUpMatrix().then((matrix) =>
    steps.map(([r, d]) => {
      const width = matrix[0].length;
      let x = 0;
      let y = 0;
      let hits = 0;

      while (y < matrix.length - 1) {
        x = x + r;
        y = y + d;
        // to repeat the matrix to the right
        // simply start from left again x % width
        if (matrix[y][x % width] === tree) {
          hits++;
        }
      };

      return hits;
    })
  );

const main = () => {
  const part1 = [[3,1]];
  treeHunt(part1).then(trees => console.log(trees));

  const part2 = [[1,1], [3,1], [5,1], [7,1], [1,2]];
  treeHunt(part2).then(trees => {
    console.log(trees.reduce((m, cnt) => m * cnt, 1));
  });
}

main();

