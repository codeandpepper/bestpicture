import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_AWS_APPSYNC_GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "X-API-KEY": `${process.env.REACT_APP_AWS_APPSYNC_API_KEY}`,
    },
  };
});

export const cache: InMemoryCache = new InMemoryCache({});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
