const userResolvers = require('./user');
const questionResolvers = require('./question');
const answerResolvers = require('./answer');
const quesCommentResolvers = require('./quesComment');
const ansCommentResolvers = require('./ansComment');
const tagResolvers = require('./tag');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query: {
    ...questionResolvers.Query,
    ...userResolvers.Query,
    ...tagResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...questionResolvers.Mutation,
    ...answerResolvers.Mutation,
    ...quesCommentResolvers.Mutation,
    ...ansCommentResolvers.Mutation,
  },
  QuestionList: {
    answerCount: (parent) => parent.answers.length,
  },
  User: {
    reputation: (parent) => {
      const questionRep = parent.questions.reduce((sum, q) => sum + q.rep, 0);
      const answerRep = parent.answers.reduce((sum, a) => sum + a.rep, 0);
      return 1 + questionRep + answerRep;
    },
    totalQuestions: (parent) => parent.questions.length,
    totalAnswers: (parent) => parent.answers.length,
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
