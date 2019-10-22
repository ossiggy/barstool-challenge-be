const timestamp = require('unix-timestamp');

timestamp.round = true;

const compareDate = (prev) => {
  const oldStamp = timestamp.fromDate(prev);
  const current = timestamp.now();
  const difference = current - oldStamp;
  console.log(oldStamp, current, difference);
  if (difference >= 15) {
    return true;
  }
  return false;
};

module.exports = { compareDate };
