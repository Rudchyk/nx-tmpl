import { GraphQLObjectType } from 'graphql';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({}),
});

export default RootQueryType;
