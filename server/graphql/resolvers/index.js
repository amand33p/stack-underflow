const userResolvers = require('./user');
const questionResolvers = require('./question');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query: {
    ...questionResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  RoleType: {
    USER: 'user',
    ADMIN: 'admin',
  },
  DateTime: GraphQLDateTime,
};
