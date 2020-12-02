const getData = require('../helpers');

const RE = /(\d{1,3})-(\d{1,3}).(\w):.(\w*)/;

const readFile = () => getData().then((data) => data.split('\n').filter(n => n));

const translate = (str, regex=RE) => {
  const [wm, from, to, char, passwd] = str.match(regex);
  return {
    from: parseInt(from),
    to: parseInt(to),
    char,
    passwd: passwd.split('')
  };
}

const validates1 = ({ from, to, char, passwd }) => {
  const count = passwd.filter((c) => c === char).length;
  return count >= from && count <= to;
}

const validates2 = ({ from: pos1, to: pos2, char, passwd }) => {
  // Pay attention to the non=zero index
  const el1 = passwd[pos1-1];
  const el2 = passwd[pos2-1];
  const oneEqualsChar = el1 === char || el2 === char;
  const notBothEqualChar = !(el1 === char && el2 === char);

  return oneEqualsChar && notBothEqualChar;
};

const part1 = readFile().then((data) => data.filter((str) => validates1(translate(str))).length);
const part2 = readFile().then((data) => data.filter((str) => validates2(translate(str))).length);

setTimeout(() => console.log(part1), 2000);
setTimeout(() => console.log(part2), 4000);
