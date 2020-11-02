const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    token: String!
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): User!
  }
`;
