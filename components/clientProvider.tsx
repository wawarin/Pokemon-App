"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../libs/client";

type Props = {
  children: React.ReactNode;
};

const ApolloWrapper: React.FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
