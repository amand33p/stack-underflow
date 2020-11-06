const userResolvers = require('./user');
const questionResolvers = require('./question');
const answerResolvers = require('./answer');
const commentResolvers = require('./comment');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query: {
    ...questionResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...questionResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...answerResolvers.Mutation,
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
