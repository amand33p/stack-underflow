const { gql } = require('apollo-server');

module.exports = gql`
  enum RoleType {
    USER
    ADMIN
  }

  type User {
    id: ID!
    username: String!
    token: String!
    role: RoleType!
  }

  type Author {
    id: ID!
    username: String!
  }

  scalar DateTime

  type QuestionList {
    id: ID!
    author: Author!
    title: String!
    body: String!
    tags: [String!]!
    points: Int!
    views: Int!
    answersCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
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
    comments: [Comment]
    points: Int!
    upvotedBy: [ID]
    downvotedBy: [ID]
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
    comments: [Comment]
    answers: [Answer]
    upvotedBy: [ID]
    downvotedBy: [ID]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getAllQues: [QuestionList]!
    getQuestion: Question
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): User!
  }
`;
