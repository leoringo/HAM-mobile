const axios = require("axios");
const BASE_URL = process.env.BASE_URL_USER;
const redisClient = require('../config/redis')

const typeDefs = `#graphql

  type User {
    _id: String
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  type CreateUserResponse {
    acknowledged: Boolean
    insertedId: ID
  }

  type DeleteUserResponse {
    acknowledged: Boolean
    deletedCount: Int
  }

  type Query {
    users: [User]
    user(id: String!): User
  }

  type Mutation {
    createUser(username: String, email: String!, password: String!, phoneNumber: String, address: String): CreateUserResponse
    deleteUser(id: String!): DeleteUserResponse
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      let cachedKey = "users";
      let cachedData = JSON.parse(await redisClient.get(cachedKey));
      if (cachedData) {
        return cachedData;
      }
      try {
        const { data } = await axios.get(`${BASE_URL}/users`)
        await redisClient.set(cachedKey, JSON.stringify(data));
        return data;
      } catch (error) {
        return error;
      }
    },
    user: async (_, { id }) => {
      try {
        const { data } = await axios.get(`${BASE_URL}/users/${id}`);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/users`, args);
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const { data } = await axios.delete(`${BASE_URL}/users/${id}`);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
