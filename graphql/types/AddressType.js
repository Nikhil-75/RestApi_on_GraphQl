const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");
const { User } = require("../../models");

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    id: { type: GraphQLInt },
    state: { type: GraphQLString },
    city: { type: GraphQLString },
    pin_code: { type: GraphQLInt },
    phone_no: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

module.exports = { AddressType };
