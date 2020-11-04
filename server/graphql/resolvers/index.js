const userResolvers = require('./user');
const questionResolvers = require('./question');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query: {
    ...questionResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...questionResolvers.Mutation,
  },
  QuestionList: {
    answersCount: (parent) => parent.answers.length,
  },
  RoleType: {
    USER: 'user',
    ADMIN: 'admin',
  },
  DateTime: GraphQLDateTime,
};
