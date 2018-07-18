import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import fetch from "cross-fetch";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: publicRuntimeConfig.API_ENDPOINT,
      /* Required because of SSR (fetch used in Apollo is not present in Node env) */
      fetch
    })
  ]),
  cache: new InMemoryCache()
});

export default client;
