const axios = require("axios")
const { gql } = require("apollo-server");
// const Redis = require('ioredis')
// const redis = new Redis()

const typeDefs = gql`
  
  type Leaderboard {
    _id: ID,
    username: String
    score: Float
  }

  input InputLeaderBoard {
    username: String
    score: Float,
  }

  extend type Query {
    getLeaderboard: [Leaderboard],
    
  }

  extend type Mutation {
      postLeaderboard(newLeaderboard: InputLeaderboard): Leaderboard,
      delLeaderboard(_id: ID): Leaderboard,
  }

`;
const url = '' //http://localhost:3001/snake
const resolvers = {
    Query: {
        getLeaderboard: async () => {
          //redis? 
            const {data} = await axios.get(`${url}/leaderboard`)
            return data
          
            
        }
    },
    Mutation: {
        postLeaderboard: async (parents,args, context, info) => {
            const {newLeaderboard} = args
            const {data} = await axios.post(`${url}/leaderboard`, newLeaderboard)  
            //delete cache if used 
            return data        
        },
//------------------------------------------------------------------------------
        // delMovie: async (parents,args, context, info) => {
        //     const {_id} = args
        //     const {data} = await axios.delete(`${url}/leaderboard/${_id}`)
        //     return data
        // }
    }
}


module.exports = {typeDefs, resolvers}