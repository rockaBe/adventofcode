const getData = require('../helpers');

const transformInput = () => getData().then(
  (data) => data.split('\n\n').filter(n => n)
    .map((item) => item.replace(/\n/g, ' '))
    .map((item) => item.split(' '))
    .map((item) => item.reduce(
      (map, field) => {
        const [key, value] = field.split(':');
        return map.set(key, value);
      }, new Map())
    )
);

const validate1 = (item) => {
  const requiredKeys = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  const isValid = requiredKeys.map((key) => item.has(key)).every((bool) => bool === true);
  return isValid ? item : null;
};

const isBetween = (n, low, high) => parseInt(n) >= low && parseInt(n) <= high;
const validateByr = (n) => isBetween(n, 1920, 2002);
const validateIyr = (n) => isBetween(n, 2010, 2020);
const validateEyr = (n) => isBetween(n, 2020, 2030);
const validateHgt = (str) => {
  const [_, num, measure] = str.match(/(\d+)(\w+)/);
  if (measure === 'cm') {
    return isBetween(num, 150, 193)
  } else if (measure === 'in' ) {
    return isBetween(num, 59, 76);
  } else { return false };
};
const validateHcl = (str) => Boolean(str.match(/^#[0-9a-f]{6}$/));
const validateEcl = (str) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(str);
const validatePid = (str) => Boolean(str.match(/^\d{9}$/));

const validate2 = (item) => {
  const requiredKeys = {
    byr: validateByr,
    iyr: validateIyr,
    eyr: validateEyr,
    hgt: validateHgt,
    hcl: validateHcl,
    ecl: validateEcl,
    pid: validatePid
  };
  const returnables = Object.keys(requiredKeys).map((key) => {
    if (!item.has(key)) return false;
    return Boolean(requiredKeys[key](item.get(key)));
  });
  const isValid = returnables.every((bool) => bool === true);
  return isValid ? item : null;
}

transformInput().then(items => {
  const validatedItems1 = items.map(item => validate1(item))
                            .filter((item) => item !== null);
  console.log(validatedItems1.length);

  const validatedItems2 = items.map(item => validate2(item))
                            .filter((item => item !== null));
  console.log(validatedItems2.length);
});

