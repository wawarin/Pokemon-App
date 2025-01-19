// lib/apollo-client.ts
"use client";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app", // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;
