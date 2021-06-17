import 'cross-fetch/polyfill';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, DefaultOptions } from '@apollo/client';

const API = 'http://localhost:4000/api';

/* Disable caching to run queries right before and after the mutations and get fresh data */
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const httpLink = new HttpLink({ uri: API });

const authMiddleware = new ApolloLink((operation, forward) => {
  // let authorization;

  // if(variables.token)
  // authorization = `Bearer ${variables.token}`;
  // else if(variables.user.token)
  // authorization = `Bearer ${variables.user.token}`;
  // else
  // authorization = '';

  // operation.setContext({
  //   headers: {
  //     authorization
  //   }
  // });

  return forward(operation);
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  defaultOptions
});
