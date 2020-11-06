const userResolvers = require('./user');
const questionResolvers = require('./question');
const answerResolvers = require('./answer');
const quesCommentResolvers = require('./quesComment');
const ansCommentResolvers = require('./ansComment');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query: {
    ...questionResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...questionResolvers.Mutation,
    ...answerResolvers.Mutation,
    ...quesCommentResolvers.Mutation,
    ...ansCommentResolvers.Mutation,
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
