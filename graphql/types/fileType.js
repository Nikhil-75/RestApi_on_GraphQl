const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");


const FileType = new GraphQLObjectType({
  name: "file",
  fields: () => ({
    id: { type: GraphQLInt },
    filename: {type: GraphQLString},
    mimetype: {type: GraphQLString},
    path:  {type: GraphQLString}
  }),
});

module.exports = { FileType };