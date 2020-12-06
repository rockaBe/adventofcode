const getData = require('../helpers');
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const groupsInput = () => getData().then(
  (data) => data.split('\n\n'));

// part1 getAddedGroupAnswers
const getAddedGroupAnswers = (groupInput) =>
  groupInput.split('')
    .filter(el => el !== '\n')
    .filter(onlyUnique).length;

const getGroupAgreedYes = (groupInput) => {
  const clearedInput = groupInput.replace(/\n$/m, '');
  const groupLength = clearedInput.split('\n').length;
  const answers = clearedInput.split('').filter(el => el !== '\n');
  const uniqueAnswers = answers.filter(onlyUnique);
  return uniqueAnswers.map((answer) =>
    answers.filter(a => a === answer).length === groupLength ? 1 : 0
  ).reduce((memo, a) => memo + a, 0);
}

groupsInput().then((groups) => {
  console.log(groups.map(getAddedGroupAnswers)
    .reduce((memo, el) => memo = memo + el, 0));
  console.log(groups.map(getGroupAgreedYes)
    .reduce((memo, el) => memo = memo + el, 0));
});
