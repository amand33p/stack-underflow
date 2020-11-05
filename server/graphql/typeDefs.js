const { gql } = require('apollo-server');

module.exports = gql`
  enum RoleType {
    USER
    ADMIN
  }

  enum VoteType {
    UPVOTE
    DOWNVOTE
  }

  scalar DateTime

  type UserQuestion {
    quesId: ID!
    rep: Int!
  }

  type UserAnswer {
    ansId: ID!
    rep: Int!
  }

  type User {
    id: ID!
    username: String!
    token: String!
    role: RoleType!
    questions: [UserQuestion]!
    answers: [UserAnswer]!
  }

  type Author {
    id: ID!
    username: String!
  }

  type Comment {
    id: ID!
    author: Author!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Answer {
    id: ID!
    author: Author!
    body: String!
    comments: [Comment]!
    points: Int!
    upvotedBy: [ID]!
    downvotedBy: [ID]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type QuestionList {
    id: ID!
    author: Author!
    title: String!
    body: String!
    tags: [String!]!
    points: Int!
    views: Int!
    accepted: Boolean!
    answers: [Answer]!
    answersCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Question {
    id: ID!
    author: Author!
    title: String!
    body: String!
    tags: [String!]!
    points: Int!
    views: Int!
    accepted: Boolean!
    comments: [Comment]!
    answers: [Answer]!
    upvotedBy: [ID]!
    downvotedBy: [ID]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getAllQues: [QuestionList]!
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): User!
    viewQuestion(quesId: ID!): Question
    postQuestion(title: String!, body: String!, tags: [String!]!): Question!
    deleteQuestion(quesId: ID!): ID!
    editQuestion(
      quesId: ID!
      title: String!
      body: String!
      tags: [String!]!
    ): Question!
    voteQuestion(quesId: ID!, voteType: VoteType!): Question!
    addQuesComment(quesId: ID!, body: String!): [Comment!]!
    editQuesComment(quesId: ID!, commentId: ID!, body: String!): [Comment!]!
    deleteQuesComment(quesId: ID!, commentId: ID!): [Comment!]!
  }
`;
