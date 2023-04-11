const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PORT } = require("./config");
const userMutations = require('./graphql/mutations/userMutation');
const addressMutations = require('./graphql/mutations/addressMutations');
const userQuery = require('./graphql/queries/userQuery');


const {GraphQLObjectType, GraphQLSchema} = require('graphql');
const cors = require("cors");
const { Userschema } = require("./graphql/userSchema");
require("./db");



const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
      ...userQuery
      
  }
})


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
      ...userMutations,
      ...addressMutations
  })
})



const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
      query: Query,
        mutation: Mutation
    })

})
);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

