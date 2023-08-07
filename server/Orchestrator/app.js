require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 4000;

const [userTypeDefs, userResolvers] = require('./schema/userSchema')
const [appTypeDefs, appResolvers] = require('./schema/appSchema')

const server = new ApolloServer({
  typeDefs: [userTypeDefs, appTypeDefs],
  resolvers: [userResolvers, appResolvers],
});

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
