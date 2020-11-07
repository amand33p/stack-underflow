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
  User: {
    reputation: (parent) => {
      const questionRep = parent.questions.reduce((sum, q) => sum + q.rep, 0);
      const answerRep = parent.answers.reduce((sum, a) => sum + a.rep, 0);
      return 1 + questionRep + answerRep;
    },
  },
  RoleType: {
    USER: 'user',
    ADMIN: 'admin',
  },
  SortByType: {
    HOT: 'hot',
    VOTES: 'votes',
    VIEWS: 'views',
    NEWEST: 'newest',
    OLDEST: 'oldest',
  },
  VoteType: {
    UPVOTE: 'upvote',
    DOWNVOTE: 'downvote',
  },
  DateTime: GraphQLDateTime,
};
