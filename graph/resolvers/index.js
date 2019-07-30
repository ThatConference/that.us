import queries from './queries';
import mutations from './mutations';
import fieldResolvers from './fieldResolvers';

// interfaces
import interfaces from './interfaces';

// create the Apollo Server
const createServer = {
  ...interfaces,
  Query: {
    ...queries
  },
  // Mutation: {
  //   ...mutations
  // },
  ...fieldResolvers
};

export default createServer;
