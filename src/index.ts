import { join } from 'path';
import { readFileSync } from 'fs';

// Add @api alias to modules for absolute pathnames
import { addAlias } from 'module-alias';
addAlias('@api', __dirname + '/');

import * as express from 'express';
import * as cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import { parse } from 'graphql';
import { makeExecutableSchema } from 'apollo-server';
import { graphqlUploadExpress } from 'graphql-upload';
import { PrismaClient } from '@prisma/client';

import bodyParser = require('body-parser');

import { User } from '@api/resolvers/user/types';
import { createUser, addPostToUser } from '@api/resolvers/user/mutations';
import { user, users } from '@api/resolvers/user/queries';

import { Post } from '@api/resolvers/post/types';
import { createPost } from '@api/resolvers/post/mutations';
import { post, posts } from '@api/resolvers/post/queries';

const apolloSchema = parse(
  readFileSync(join(__dirname, './generated/app.graphql')).toString()
);

const resolvers = {
  Mutation: {
    createUser,
    addPostToUser,
    createPost,
  },
  Query: {
    user,
    users,
    post,
    posts
  },
  User,
  Post,
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs: apolloSchema,
});

const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const server = new ApolloServer({
  schema: schema,
  context: async ({ req }) => ({
    prisma: prismaClient,
  }),
  formatError: err => {
    if (process.env.NODE_ENV === 'development') {
      return err;
    }
    throw new Error('Internal server error');
  },
  uploads: false
});

const app = express();

app.use(graphqlUploadExpress({ maxFileSize: 50 * 1024 * 1024, maxFiles: 10 }));
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// serve up temp files
app.use('/temp', express.static(join(__dirname, '/static/temp')));

server.applyMiddleware({ app, path: '/api' });

const port = 4000;

console.log('API now running on port ' + port);
app.listen({ port }).setTimeout(5 * 60 * 1000);
