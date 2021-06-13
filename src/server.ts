require("dotenv").config();
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import client from "./client";
import { getUser } from "./user/users.utils";
import { graphqlUploadExpress } from "graphql-upload";
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  playground:true,
  introspection:true,
  context: async({req}) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    }
  },
    
});
const PORT = process.env.PORT

const app = express();


apollo.applyMiddleware({ app });

app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
app.use("/static", express.static("uploads"));

app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
});