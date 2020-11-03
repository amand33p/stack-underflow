const userResolvers = require('./user');

module.exports = {
  Query: {
    sayHi: () => 'Hello',
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  RoleType: {
    USER: 'user',
    ADMIN: 'admin',
  },
};
