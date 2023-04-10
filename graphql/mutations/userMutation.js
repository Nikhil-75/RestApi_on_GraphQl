const { UserType } = require("../types/userType");
const Users = require("../../models/userModel");
const { GraphQLString, GraphQLInt } = require("graphql");
const bcrypt = require("bcrypt");

const registerUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  resolve: async (parent, args) => {
    const { email, firstName, lastName, username, password } = args;
    const data = await Users.findOne({ where: { email } });
    if (data) throw new Error("email already exists");

    const userName = await Users.findOne({ where: { username } });
    if (userName) throw new Error("username already exists");

    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailExpression.test(String(email).toLowerCase());
    if (!isValidEmail) throw new Error("email not in proper format");

    if (password.length < 5)
      throw new Error("password should be minimum 5 characters");
    args.password = bcrypt.hashSync(args.password, 10);

    const user = await Users.create(args);
    return user;
  },
};

const updateUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { username, email, id } = args;
    const result = await Users.update({ username, email }, { where: { id } });
    if (!result[0]) throw new Error("user not found with id");
    return await Users.findByPk(id);
  },
};

const deleteUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const { id } = args;
    const result = await Users.destroy({
      where: { id: id },
    });
    if (!result) {
      throw new Error("user not found with id");
    }
    throw new Error("user deleted success with id");

    return await Users.findByPk(id);
  },
};

module.exports = { registerUser, updateUser, deleteUser };
