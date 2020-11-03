const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const authChecker = (context) => {
  const token = context.req.headers.authorization;
  if (!token) {
    throw new AuthenticationError('No auth token found. Authorization denied.');
  }

  const decodedUser = jwt.verify(token, SECRET);
  if (!decodedUser.id) {
    throw new AuthenticationError(
      'Token verification failed. Authorization denied.'
    );
  }

  return decodedUser;
};

module.exports = authChecker;
