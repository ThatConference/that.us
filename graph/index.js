import { ApolloServer } from 'apollo-server-micro';

import typeDefs from './typedefs';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export default server.createHandler({ path: '/graph' });
