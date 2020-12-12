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

const stepThrough = (data) => {
  data.push(data[data.length-1]+deviceBuiltInadapterBuffer);
  data.unshift(outletEffectiveRating);
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

parseInput().then(data => {
  const result = stepThrough(data);
  console.log(`1 jolt: ${result[1].length} 3 jolt: ${result[3].length}`);
  console.log(`Part 1: ${result[1].length * result[3].length}`);
});
