const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./type-defs.js');
const { resolvers } = require('./resolvers.js');

const server = new ApolloServer({ typeDefs, resolvers, context: ({req}) => {
  return { req }
}});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});