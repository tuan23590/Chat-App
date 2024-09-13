import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from '../utils/constants';

const httpLink = new HttpLink({
  uri: GRAPHQL_SUBSCRIPTION_ENDPOINT, // Replace with your GraphQL endpoint
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_SUBSCRIPTION_ENDPOINT, // Replace with your WebSocket GraphQL endpoint
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function SubscriptionProvider({ children }) {
    return (
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      );
}