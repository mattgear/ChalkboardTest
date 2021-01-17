const jwt = require('jsonwebtoken');

const tokenAuthentication = (token) => {
  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      throw Error('You are not authorized');
    }
  });
};

module.exports = tokenAuthentication;
