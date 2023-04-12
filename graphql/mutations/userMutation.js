const { UserType } = require("../types/userType");
const User = require("../../models/userModel");
const otp = require('../../models/otpModel')
const { GraphQLString, GraphQLInt } = require("graphql");
const bcrypt = require("bcrypt");

const GraphQLUUID = require('graphql-type-uuid') ;
const { v4: uuidv4 } = require("uuid");

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
    const data = await User.findOne({ where: { email } });
    if (data) throw new Error("email already exists");

    const userName = await User.findOne({ where: { username } });
    if (userName) throw new Error("username already exists");

    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailExpression.test(String(email).toLowerCase());
    if (!isValidEmail) throw new Error("email not in proper format");

    if (password.length < 5)
      throw new Error("password should be minimum 5 characters");
    args.password = bcrypt.hashSync(args.password, 10);
    const result = await User.create(args);
    console.log(result);
    return result;
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
    const result = await User.update({ username, email }, { where: { id } });
    if (!result[0]) throw new Error("user not found with id");
    return await User.findByPk(id);
  },
};

const forgetPassword = {
  type: UserType,
  args: {
    
    email: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { email } = args;
   
    const user = await User.findOne({ where: { email } });
    console.log(user)
    if (!user) throw new Error("email is not correct");
    //console.log(user)
  },
};

const deleteUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const { id } = args;
    const result = await User.destroy({
      where: { id: id },
    });
    if (!result) {
      throw new Error("user not found with id");
    }
    throw new Error("user deleted success with id");

    return await User.findByPk(id);
  },
};

module.exports = { registerUser, updateUser, forgetPassword, deleteUser };
