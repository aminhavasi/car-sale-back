const Graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = Graphql;

const h = (a) => {
    console.log(a);
    return { name: a.id };
};
const CarType = new GraphQLObjectType({
    name: 'car',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: { type: GraphQLString },
        group: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        car: {
            type: CarType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return { name: 'as', id: '45' };
            },
        },
    },
});
const MutationQuery = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        car: {
            type: CarType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args, context) {
                return { name: 'as' };
            },
        },
    },
});

//
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationQuery,
});
