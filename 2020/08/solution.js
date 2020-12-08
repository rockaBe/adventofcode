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

const runCommands = (parsed) => {
  const state = { accumulator: 0, index: 0, visited: [], hasFinished: false };
  while (true) {
    if (state.index < 0 || state.index > parsed.length - 1) { break; }
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
    if (Math.max(...state.visited) === parsed.length - 1) {
      state.hasFinished = true;
      break;
    }
  };
  return state;
}

const part1 = async () => {
  const parsed = await parseInput();
  return runCommands(parsed);
};

const part2 = async () => {
  const parsed = await parseInput();
  const changes = { nop: 'jmp', jmp: 'nop' };
  let result = null;
  let swapIndex = 0;
  while (swapIndex < parsed.length) {
    if (Object.keys(changes).includes(parsed[swapIndex].cmd)) {
      parsed[swapIndex].cmd = changes[parsed[swapIndex].cmd];
      const { accumulator, hasFinished } = runCommands(parsed);
      if (hasFinished) {
        result = accumulator;
        break;
      }
      // we need to reset the changed command
      parsed[swapIndex].cmd = changes[parsed[swapIndex].cmd];
    }
    swapIndex++;
  }
  return result;
}

part1().then(result => console.log('Result Part 1: ', result.accumulator))
part2().then(result => console.log("Result Part 2: ", result));
