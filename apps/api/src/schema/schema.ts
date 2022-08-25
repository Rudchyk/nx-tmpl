import { GraphQLSchema } from 'graphql';
import { RootQueryType } from '../types';
import mutation from './mutation';

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});

export default schema;
