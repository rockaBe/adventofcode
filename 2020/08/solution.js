const getData = require('../helpers');

const parseInput = async () =>
  getData().then((data) =>
    data.split('\n').filter(n => n)
      .map(val => splitCommandAndVal(val)));

const splitCommandAndVal = (el) => {
  const [cmd, sVal] = el.split(' ');
  return { cmd, val: parseInt(sVal) };
};

const runCommands = (commands) => {
  const state = { accumulator: 0, index: 0, visited: [], hasFinished: false };
  while (true) {
    // terminate when we visited this command before (part1)
    if (state.visited.includes(state.index)) { break; }
    // avoid getting out of array bounds
    if (state.index < 0 || state.index > commands.length -1) { break; }
    const { cmd, val } = commands[state.index]
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
    // we reached the end of the command chain
    if (Math.max(...state.visited) === commands.length - 1) {
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
  const commands = await parseInput();
  const swappers = { nop: 'jmp', jmp: 'nop' };
  let result = null;
  let swapIndex = 0;
  let currentCmd;
  while (swapIndex < commands.length) {
    currentCmd = commands[swapIndex].cmd;
    if (Object.keys(swappers).includes(currentCmd)) {
      commands[swapIndex].cmd = swappers[currentCmd];
      const { accumulator, hasFinished } = runCommands(commands);
      if (hasFinished) {
        result = accumulator;
        break;
      }
      // we need to reset the changed command
      commands[swapIndex].cmd = swappers[commands[swapIndex].cmd];
    }
    swapIndex++;
  }
  return result;
}

part1().then(result => console.log('Result Part 1: ', result.accumulator))
part2().then(result => console.log("Result Part 2: ", result));
