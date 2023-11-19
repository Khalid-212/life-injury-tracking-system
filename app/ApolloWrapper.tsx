"use client";
import React from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import clientCookies from "js-cookie";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { setVerbosity } from "ts-invariant";

if (process.env.NODE_ENV === "development") {
  setVerbosity("debug");
  loadDevMessages();
  loadErrorMessages();
}

export function ApolloWrapper({
  children,
  delay: delayProp,
}) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );

  function makeClient() {
    const httpLink = new HttpLink({
      uri: "https://life-injury-tracking-system.vercel.app/api/graphql",
      fetchOptions: { cache: "no-store" },
    });

    const delayLink = new ApolloLink((operation, forward) => {
      const delay =
        typeof window === "undefined"
          ? delayProp
          : clientCookies.get("apollo-x-custom-delay") ?? delayProp;
      operation.setContext(({ headers = {} }) => {
        return {
          headers: {
            ...headers,
            "x-custom-delay": delay,
          },
        };
      });

      return forward(operation);
    });
    const link =
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: false,
              cutoffDelay: 100,
            }),
            delayLink,
            httpLink,
          ])
        : ApolloLink.from([delayLink, httpLink]);

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link,
    });
  }
}