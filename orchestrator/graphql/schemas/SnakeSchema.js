const axios = require("axios")
const { gql } = require("apollo-server");
const redis = require('../config/redis');

const url = 'http://18.141.219.182:3001/snake';

const typeDefs = gql`
  type snake_leaderboard {
    _id: ID
    username: String
    score: Int
  }
  
  type response_snake {
    message: String!
  }

  input input_snake_leaderboard {
    username: String
    score: Int
  }

  extend type Query {
    get_snake_leaderboard: [snake_leaderboard]
    clear_snake_cache: response_snake
  }

  extend type Mutation {
    post_snake_leaderboard(new_leaderboard: input_snake_leaderboard!): snake_leaderboard
  }
`;

const resolvers = {
  Query: {
    get_snake_leaderboard: async () => {
      try {
        const leaderboard = await redis.get('snake');
        if (leaderboard) {
          return JSON.parse(leaderboard);
        } else {
          const { data } = await axios.get(`${url}/leaderboard`)
          redis.set('snake', JSON.stringify(data));
          return data
        }
      } catch (error) {
        console.log(error);
      }
    },
    clear_snake_cache: async () => {
      try {
        await redis.del('snake');
        return { message: 'OK' };
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    post_snake_leaderboard: async (_, args) => {
      try {
        const { new_leaderboard } = args;
        const { data } = await axios.post(`${url}/leaderboard`, new_leaderboard);
        redis.del('snake');
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports = { typeDefs, resolvers }