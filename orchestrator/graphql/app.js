const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const snakeSchema = require('./schemas/SnakeSchema')
const whackAMoleSchema = require('./schemas/MoleSchema')

const typeDefs = gql`
  
  type Message {
    message: String
  }

  type Query,
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [ typeDefs, snakeSchema.typeDefs, whackAMoleSchema.typeDefs ],
  resolvers: [ snakeSchema.resolvers, whackAMoleSchema.resolvers ]
}) 

const server = new ApolloServer({schema})

server.listen(4003).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})