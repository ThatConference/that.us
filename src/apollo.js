import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';

const headers = {
  'content-type': 'application/json',
};

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:9090/graphql',
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({ headers }),
  },
});

const httpLink = new HttpLink({
  uri: 'http://localhost:9090/graphql',
  headers,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link,
  cache,
});
