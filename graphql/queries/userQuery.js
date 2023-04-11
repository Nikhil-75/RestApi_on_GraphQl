const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");

const { UserType } = require("../types/userType");
//const  User = require("../../models/userModel");
const User = require("../../models/userModel");
const { where } = require("sequelize");

const userQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: { name: "id", type: GraphQLInt },

    username: { name: "username", type: GraphQLString },

    email: { name: "email", type: GraphQLString },

    firstName: { name: "firstName", type: GraphQLString },

    lastName: { name: "lastName", type: GraphQLString },

    password: { name: "password", type: GraphQLString },

    createdAt: { name: "createdAt", type: GraphQLString },

    updatedAt: { name: "updatedAt", type: GraphQLString },
  },
  resolve: (user, args) => User.findAll({ where: user }),
};

const getId = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
  },

  resolve: async (parent, args) => {
    const { id } = args;
    const result = await User.findByPk(id);
    console.log(result);
    return result.data;
  },
};

/*const loginUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString},
    password: { type: GraphQLString}
  },

  resolve: async (parent, args) => {
    const { email, password} = args;

  }
}*/

module.exports = { userQuery };
