const { UserType } = require('../types/userType');
const  Users  = require('../../models/userModel');
const {GraphQLString, GraphQLInt} = require('graphql')


const registerUser ={
  type: UserType,
  args: {
   
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      username: { type: GraphQLString},
      email: { type: GraphQLString },
      password: { type: GraphQLString },
  },

  resolve: async (parent, args) => {
    const {email, firstName, lastName, username,password} = args;
      const user = await Users.create(args);
      return user; 
  }
}

module.exports = {registerUser};
