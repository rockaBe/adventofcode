'use strict';

const input = require('./input.json');
const target = 2020;
const length = input.length-1;

const part1 = () => {
  let num1, num2;
  for (let i=0; i<length; i++) {
    for (let j=length; j>=0; j--) {
      if (input[i] + input[j] === target) {
        num1 = input[i];
        num2 = input[j];
        break;
      }
    }
  }
  return { num1, num2, product: num1 * num2 };
}

// sort array in descending order
// start with the biggest 3 numbers
// check their sum
// while sum is greater than target, make summands smaller
// by increasing index of left and middle by one and bring right to middle +1 (needed in case we go smaller)
// while sum is smaller than target, increase smallest summand (right index)
// by decreasing index of right

const part2 = () => {
  let left = 0;
  let middle = 1;
  let right = 2;
  let found = false;
  const sorted = input.sort((a, b) => a - b).reverse();

  while (!found) {
    let sum = sorted[left] + sorted[middle] + sorted[right];

    if (sum === target) {
      found = true;
    } else if (sum < target) {
      console.log('smaller')
      right--;
    } else if (sum > target) {
      console.log('bigger')
      left++;
      middle++;
      right++;
    }
  }

  return {
    num1: sorted[left],
    num2: sorted[middle],
    num3: sorted[right],
    sum: sorted[left] + sorted[middle] + sorted[right],
    product: sorted[left] * sorted[middle] * sorted[right]
  }
}

console.log(JSON.stringify(part1()));

console.log(JSON.stringify(part2()));
