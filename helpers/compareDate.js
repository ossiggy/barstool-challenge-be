const timestamp = require('unix-timestamp');

timestamp.round = true;

const compareDate = (prev) => {
  const oldStamp = timestamp.fromDate(prev);
  const current = timestamp.now();
  const difference = current - oldStamp;
  return difference >= 15;
};

module.exports = compareDate;
