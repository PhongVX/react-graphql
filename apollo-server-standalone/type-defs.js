const { gql } = require('apollo-server');

const typeDefs = gql`
  type UserSuccessfulResult {
    result: [User]
  }

  type UserErrorResult {
    errorId: String!
    errorMessage: String!
  }

  union UserResult = UserSuccessfulResult | UserErrorResult

  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    sex: String
    posts: [Post]
  }

  type Query {
    users: UserResult
    user(id: ID!): User!
    posts: [Post]
    post(id: ID!): Post!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    sex: String 
  }

  input UpdateUserInput {
    id: ID!
    firstName: String
    lastName: String
    sex: String 
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    deleteUser(id: ID!): Boolean
    updateUser(input: UpdateUserInput!): Boolean
  }
`

module.exports = {
    typeDefs
};