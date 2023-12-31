import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from '@apollo/server';
import { NextRequest } from "next/server";
import { typeDefs } from "../../../graphql/schema";
import resolvers from "../../../graphql/resolvers";
import { PrismaClient } from "@prisma/client";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});
export type Context = {
	prisma: PrismaClient;
};

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
