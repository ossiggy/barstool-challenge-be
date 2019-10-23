const isValid = (game, reqFields) => {
  let valid = true;
  reqFields.forEach(field => {
    valid = valid && (field in game)
  })
  return valid;
};

module.exports = isValid;
