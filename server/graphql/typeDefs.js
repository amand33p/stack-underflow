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

  type Query {
    sayHi: String!
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): User!
  }
`;
