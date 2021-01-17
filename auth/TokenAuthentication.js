const jwt = require('jsonwebtoken');

const TokenAuthentication = (token) => {
  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      throw Error('You are not authorized');
    }
  });
};

module.exports = TokenAuthentication;
