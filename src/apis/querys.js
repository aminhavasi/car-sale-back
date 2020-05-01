const Graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = Graphql;
const User = require('./../models/user');
const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        car: {
            type: userType,
        },
    },
});
const MutationQuery = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    const newUser = await new User(args);
                    let user = await newUser.save();
                    return user;
                } catch (err) {
                    return err;
                }
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationQuery,
});
