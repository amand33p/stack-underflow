const userResolvers = require('./user');

module.exports = {
  Query: {
    sayHi: () => 'Hello!',
  },
};
