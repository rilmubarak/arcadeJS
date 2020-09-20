const snakeSchema = require('./schemas/movie-schema')
const whackAMoleSchema = require('./schemas/tvseries-schema')
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");


const typeDefs = gql`
  type Query,
  type Mutation
`;
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, snakeSchema.typeDefs, whackAMoleSchema.typeDefs],
  resolvers: [snakeSchema.resolvers, whackAMoleSchema.resolvers]
})

const server = new ApolloServer({schema});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});