const { UserType } = require("../types/userType");
const User = require("../../models/userModel");
const Otp = require("../../models/otpModel");
const { GraphQLString, GraphQLInt } = require("graphql");
const bcrypt = require("bcrypt");
const GraphQLUUID = require("graphql-type-uuid");
const { v4: uuidv4 } = require("uuid");

const { JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");
const JwtService = require("../../services/jwtService");

const salt = 10;

const registerUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    const { email, firstName, username, password, confirm_password } = args;
    const data = await User.findOne({ where: { email } });
    console.log(data);
    if (data) throw new Error("email already exists");
    const userName = await User.findOne({ where: { username } });
    if (userName) {
      throw new Error("username already exists");
    }
    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail = emailExpression.test(String(email).toLowerCase());
    if (!isValidEmail) throw new Error("email not find");
    if (password !== confirm_password)
      throw new Error("password does not match");

    if (password.length < 8)
      throw new Error("password should be minimum 6 characters");
    args.password = bcrypt.hashSync(args.password, 10);
    const user = await User.create(args);
    const access_token = JwtService.sign({ _id: user.id });
    console.log(access_token);
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
    const result = await User.update({ username, email }, { where: { id } });
    if (!result[0]) throw new Error("user not found with id");
    return await User.findByPk(id);
  },
};

/*const ForgetPassword = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    const { email } = args;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("invalid email");
  },
};*/

const ForgetPassword = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { email } = args;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("invalid email");

    await PasswordReset.deleteMany({ email });
    const otp = uuidv4().slice(0, 4);
    console.log(otp);
    const pr = new Otp({ email, otp });
    await pr.save();
    return user;
  },
};

const codeVerify = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    otp: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { otp, email, password, confirm_password } = args;
    const user = await User.findOne({ where: { email } });
    //console.log(user)
    if (!user) throw new Error("invalid email");
    const userExist = await Otp.findOne({ email });
    console.log(userExist.otp, otp);
    if (otp !== userExist.otp) throw new Error("invalid user");
    if (password !== confirm_password)
      throw new Error("password and confirm password does not match");
    const hashPassword = await bcrypt.hash(password, 10);
    await User.update({ password: hashPassword }, { where: { email } });
    //await updatePassword.save();
    //await PasswordReset.deleteMany({ email });

    return user;
  },
};

const deleteUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const { id } = args;
    const result = await User.destroy({ where: { id: id } });
    if (!result) {
      throw new Error("user not found with id");
    }
    throw new Error("user deleted success with id");

    return await User.findByPk(id);
  },
};

module.exports = {
  registerUser,
  updateUser,
  ForgetPassword,
  codeVerify,
  deleteUser,
};
