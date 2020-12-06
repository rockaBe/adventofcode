const getData = require('../helpers');
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const groupsInput = () => getData().then(
  (data) => data.split('\n\n'));

const getGroupAnswers = (groupInput) =>
  groupInput.split('')
    .filter(el => el !== '\n')
    .filter(onlyUnique).length;

groupsInput().then((groups) =>
  console.log(groups.map(getGroupAnswers)
  .reduce((memo, el) => memo = memo + el, 0)));


