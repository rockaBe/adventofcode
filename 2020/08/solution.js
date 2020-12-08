const { stat } = require('fs');
const getData = require('../helpers');

const numberify = (str) => {
  const split = str.split('');
  if (split[0] === '+') { delete split[0] };
  return parseInt(split.join(''), 10);
};

const parseInput = async () =>
  getData().then((data) =>
    data.split('\n').filter(n => n)
      .map(val => splitCommandAndVal(val)));

const splitCommandAndVal = (el) => {
  const [cmd, sVal] = el.split(' ');
  return { cmd, val: numberify(sVal) };
};

const runCommands = ({state, parsed}) => {
  while (true) {
    if (state.visited.includes(state.index)) { break; }
    const { cmd, val } = parsed[state.index]
    state.visited.push(state.index);
    switch (cmd) {
      case 'acc':
        state.index++;
        state.accumulator += val;
        break;
      case 'jmp':
        state.index += val;
        break;
      case 'nop':
        state.index++;
    }
  };
  return state;
}

const part1 = async () => {
  const parsed = await parseInput();
  const state = { accumulator: 0, index: 0, visited: []};
  return runCommands({state, parsed})
};

part1().then(result => console.log(result))
