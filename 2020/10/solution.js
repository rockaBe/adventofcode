// constraints:
// outletEffectiveRating: 0
// deviceBuiltInadapterBuffer: 3

const getData = require('../helpers');
const outletEffectiveRating = 0;
const deviceBuiltInadapterBuffer = 3;
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const parseInput = async (sample=null) =>
  getData(sample).then((data) =>
    data.split('\n').filter(n => n)
      .map(val => parseInt(val))
      .sort((a, b) => a-b));

const inBetween = (val, lo) => lo < val && val <= lo + deviceBuiltInadapterBuffer;
const appendInitState = (data) => [outletEffectiveRating, ...data, data[data.length - 1] + deviceBuiltInadapterBuffer];

const stepThrough = (data) => {
  const matches = [];
  const jumps = { 1: [], 3: [] };
  data.forEach((_, i) => {
    matches.push(data.filter((el) => inBetween(el, data[i])));
  });
  let c = 0;
  let prevNum = 0;
  while (c < matches.length) {
    let num;
    let cnt = 0;
    while (cnt < matches[c].length) {
      num = matches[c][cnt];
      console.log(num, matches[c])
      if (num - prevNum >= 1) {
        break;
      }
      cnt++;
    }

    const difference = num - prevNum;

    difference === 1 ? jumps[1].push(num) : jumps[3].push(num)
    c++; prevNum = num;
  }
  jumps[1] = jumps[1].filter(onlyUnique).filter(n => n)
  jumps[3] = jumps[3].filter(onlyUnique).filter(n => n)
  return jumps;
}

const getAllPossibilities = (data) => {
  const result = data.reduce((options, num, index, data) => {
    for (let i = index + 1; i < data.length; i++) {
      if (data[i] - num <= 3) {
        if (options[i] === undefined) {
          options[i] = 0
        }
        options[i] += options[index];
      } else break;
    }
    return options;
  }, [1]);
  return result[result.length - 1];
}

parseInput().then(data => {
  const result = stepThrough(appendInitState(data));
  console.log(`1 jolt: ${result[1].length} 3 jolt: ${result[3].length}`);
  console.log(`Part 1: ${result[1].length * result[3].length}`);
  console.log(`Part 2: ${getAllPossibilities(appendInitState(data))}`);
});
