const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require("graphql");

const app = express();

const UserQueryType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: {
      type: UserQueryType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) =>{
        return {
            id: args.id,
            name: 'Syed Talha Hussain',
            email: 'syedtalha71x@gmail.com'
        }
      }
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});

