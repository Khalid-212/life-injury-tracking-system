import { ApolloClient, InMemoryCache } from "@apollo/client"

export function initializeApollo() {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
  })

  return client
}