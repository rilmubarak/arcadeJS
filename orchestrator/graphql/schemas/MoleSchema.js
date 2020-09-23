const axios = require("axios")
const { gql } = require("apollo-server");
const redis = require('../config/redis');

const url = 'http://18.141.219.182:3002/whack';

const typeDefs = gql`
  type mole_leaderboard {
    _id: ID
    username: String
    score: Int
  }

  type response_mole {
    message: String!
  }

  input input_mole_leaderboard {
    username: String
    score: Int
  }

  extend type Query {
    get_whack_leaderboard: [mole_leaderboard]
    clear_whack_cache: response_mole
  }

  extend type Mutation {
    post_whack_leaderboard(new_leaderboard: input_mole_leaderboard): mole_leaderboard
  }
`;

const resolvers = {
  Query: {
    get_whack_leaderboard: async () => {
      try {
        const leaderboard = await redis.get('whack');
        if (leaderboard) {
          return JSON.parse(leaderboard);
        } else {
          const { data } = await axios.get(`${url}/leaderboard`)
          redis.set('whack', JSON.stringify(data));
          return data
        }
      } catch (error) {
        console.log(error);
      }
    },
    clear_whack_cache: async () => {
      try {
        await redis.del('whack');
        return { message: 'OK' };
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    post_whack_leaderboard: async (_, args) => {
      try {
        const { new_leaderboard } = args;
        const { data } = await axios.post(`${url}/leaderboard`, new_leaderboard);
        redis.del('whack');
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports = { typeDefs, resolvers }