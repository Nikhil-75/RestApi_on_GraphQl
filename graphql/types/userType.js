const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    //otp: {type: GraphQLString},
    //address: { type: GraphQLString },
    access_token: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const UserLoginType = new GraphQLObjectType({
  name: "UserLogin",
  fields: () => ({
    access_token: { type: GraphQLString },
  })
})

const ForgetType = new GraphQLObjectType({
  name: "UserForget",
  fields: () => ({
  otp: {type: GraphQLString},
  })
})
module.exports = { UserType, UserLoginType, ForgetType };
