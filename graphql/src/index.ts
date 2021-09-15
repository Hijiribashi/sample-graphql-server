const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { importSchema } = require('graphql-import');

// The GraphQL schema
const typeDefs = importSchema('typeDefs/query.gql');

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

var app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.get('/playground',  expressPlayground({ endpoint: '/graphql' }));

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready`);
});
