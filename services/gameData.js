const request = require('request-promise');

const getData = (uri) => {
  const options = {
    uri,
    headers: {
      'Content-type': 'application/json'
    },
    json: true,
  };

  return request(options);
};

module.exports = { getData };
