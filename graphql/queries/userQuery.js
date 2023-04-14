const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const User = require("../../models/userModel");
const { where } = require("sequelize");
const { UserType, UserLoginType } = require("../types/userType");
const jwtService = require("../../services/jwtService");
const {JWT_SECRET} = require("../../config");
const jwt = require("jsonwebtoken");
const key = require("../../config");
const bcrypt = require("bcryptjs");
const Users = require("../../models/userModel");

const userQuery = {
  type: UserType,
  args: {
    id: { name: "id", type: GraphQLInt },
  },
  //resolve: (user, args) => User.findAll({ where: user }),

  resolve: async (parent, args) => {
    const user = await User.findOne({
      where: args.id,
    });
    return user;
  },
};

const userLogin = {
  type: UserLoginType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  resolve: async (parent, args) => {
    const { email, password } = args;
    const result = await User.findOne({ where: { email } });
    if (!result) throw new Error("user not found");
    checkPassword = await bcrypt.compare(password, result.password);
    if (!checkPassword) throw new Error("password is not correct");
    const token = jwt.sign({ user_id: email }, JWT_SECRET, {
      expiresIn: "2h",
    });
    return { access_token:token};
  },
};

module.exports = { userQuery, userLogin };
