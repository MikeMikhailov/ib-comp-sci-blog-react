import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://py89pcivba.execute-api.eu-central-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
