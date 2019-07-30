import { importSchema } from 'graphql-import';

const typeDefs = () => importSchema(`${__dirname}/schema.graphql`);

export default typeDefs();
