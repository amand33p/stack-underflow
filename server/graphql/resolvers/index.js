const userResolvers = require('./user');

module.exports = {
  Query: {},
  Mutation: {
    ...userResolvers.Mutation,
  },
};
