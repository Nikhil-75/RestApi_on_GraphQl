const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PORT } = require("./config");
const userMutations = require("./graphql/mutations/userMutation");
const addressMutations = require("./graphql/mutations/addressMutations");
const userQuery = require("./graphql/queries/userQuery");

const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const cors = require("cors");
const { Userschema } = require("./graphql/userSchema");
require("./db");

// const ImageUpload = require("./graphql/mutations/fileUpload.js");
// const { GraphQLUpload } = require("graphql-upload");
// const { createReadStream } = require("fs");
// const { FileType } = require("./graphql/types/FileType");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQuery,
  },
});

 const Mutation = new GraphQLObjectType({
   name: "Mutation",
   fields: () => ({
       ...userMutations,
      ...addressMutations
   })
 })

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",

//   fields: {
//     ...userMutations,
//     ...addressMutations,
//     uploadImage: {
//       description: "Uploads an image.",
//       type: GraphQLBoolean,
//       args: {
//         image: {
//           description: "Image file.",
//           type: GraphQLUpload,
//         },
//       },

//       async resolve(parent, { image }) {
//         const { filename, mimetype, createReadStream } = await image;
//         const stream = createReadStream();
//         // Promisify the stream and store the file, then…
//         return true;
//       },
//     },
//   },
// });

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
      mutation: Mutation,
    }),
  })
);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
