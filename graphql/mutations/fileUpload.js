/*const { createReadStream } = require("fs");
const { GraphQLBoolean, GraphQLObjectType, GraphQLSchema } = require("graphql");
const { GraphQLUpload } = require("graphql-upload");

const ImageUpload = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      uploadImage: {
        type: GraphQLBoolean,
        args: { image: { type: GraphQLUpload } },
        async resolve(parent, { image }) {
          const { filename, mimetype, createReadStream } = await image;
          const stream = createReadStream();
          return true;
        },
      },
    },
  }),
});

module.exports = { ImageUpload };*/
