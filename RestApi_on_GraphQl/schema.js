const graphql = require('graphql');
const Users = require('./models/Users');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = graphql;


const UserType =  new GraphQLObjectType({
    name: 'user',
    fields:()=>({
      
        username: {type: GraphQLString},
        FirstName: {type: GraphQLString},
        LastName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        Password2: {type: GraphQLString}
      
   
    })
})

//const db = require('./models');
//const User = db.users

const RootQuery = new GraphQLObjectType({
    name: 'register',
    fields:{
        UserSchema:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                let data = [
                    {
                    username: 'raulsarma', email:'rahulsharmagv@y.maill.com', FirstName: 'formula', LastName: 'formula', password: '12344555'
                },

                {
                     username: 'manav', email:'hududhu@ucbuGmail.com', FirstName: 'formula', LastName: 'hvdvydvdvd', password: '12344555'
                },

                
        
            ]
            return data
            }
        },

    }
})

module.exports = new GraphQLSchema({ query: RootQuery})




