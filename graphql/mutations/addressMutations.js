const { AddressType } = require("../types/AddressType");
const Address = require("../../models/addressModel");

const { GraphQLString, GraphQLInt } = require("graphql");

const userAddress = {
  type: AddressType,
  args: {
    id: { type: GraphQLInt },
    pin_code: { type:GraphQLInt },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    phone_no: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const address = await Address.create(args);
    return address;
  },
};

module.exports = { userAddress };