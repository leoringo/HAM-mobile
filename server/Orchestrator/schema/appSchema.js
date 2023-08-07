const axios = require("axios");
const BASE_URL = process.env.BASE_URL_APP;
const BASE_URL_USER = process.env.BASE_URL_USER
const redisClient = require("../config/redis");

const typeDefs = `#graphql
    type Product {
        id: ID
        name: String
        slug: String
        description: String
        price: Int
        mainImg: String
        categoryId: Int
        mongoUserId: String
        Category: Category
        Images: [Image]
        User: User
    }

    type User {
    _id: String
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
    }

    type Category {
        # id: ID
        name: String
    }

    type Image {
        # id: ID
        # productId: Int
        imgUrl: String
    }

    type Response {
        message: String
    }

    input ProductInput {
        name: String!
        description: String!
        price: Int!
        mainImg: String!
        categoryId: Int!
        mongoUserId: String!
        images: [ImageInput]
    }

    input ProductEdit {
        id: ID!
        name: String!,
        description: String!,
        price: Int!,
        mainImg: String!
        categoryId: Int!
    }

    input ImageInput {
        imgUrl: String!
    }

    type Query {
        getProducts: [Product]
        getProductById(id:ID!): Product
        getCategories: [Category]
    }

    type Mutation {
        createProduct(content: ProductInput): Response
        updateProduct(content: ProductEdit): Response
        deleteProduct(id:ID!): Response
    }
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      let cachedKey = "products";
      let cachedData = JSON.parse(await redisClient.get(cachedKey));
      if (cachedData) {
        return cachedData;
      }
      try {
        const { data } = await axios.get(`${BASE_URL}/products`);
        const products = data;
        await redisClient.set(cachedKey, JSON.stringify(products));
        return products;
      } catch (error) {
        return error;
      }
    },

    getProductById: async (_, { id }) => {
      try {
        const { data } = await axios.get(`${BASE_URL}/products/${id}`);
        const { data: user } = await axios.get(`${BASE_URL_USER}/users/${data.mongoUserId}`)
        data.User = user;
        return data;
      } catch (error) {
        return error;
      }
    },

    getCategories: async () => {
      let cachedKey = "categories";
      let cachedData = await redisClient.get(cachedKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      try {
        const { data } = await axios.get(`${BASE_URL}/categories`);
        await redisClient.set(cachedKey, JSON.stringify(data));
        return data;
      } catch (error) {
        return error;
      }
    },
  },

  Mutation: {
    createProduct: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/products`,
          method: "post",
          data: args.content,
        });
        await redisClient.del("products");
        return data;
      } catch (error) {
        return error;
      }
    },

    updateProduct: async (_, args) => {
      try {
        const { id, ...input } = args.content;
        const { data } = await axios.put(`${BASE_URL}/products/${id}`, input);
        await redisClient.del("products");
        return data;
      } catch (error) {
        return error;
      }
    },

    deleteProduct: async (_, args) => {
      try {
        const { id } = args
        const { data } = await axios.delete(`${BASE_URL}/products/${id}`)
        await redisClient.del("products");
        return data
      } catch (error) {
        return error
      }
    }
  },
};

module.exports = [typeDefs, resolvers];
