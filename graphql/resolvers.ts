import { PrismaClient } from "@prisma/client";
import { Context } from "../app/api/graphql/route";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      try {
        const users = await prisma.user.findMany({
          include: {
            injuries: true,
          },
        });

        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Unable to fetch users.");
      }
    },
    injuries: async (parent, args, context) => {
      try {
        const injuries = await prisma.injury.findMany({
          include: {
            reportedBy: true,
          },
        });

        return injuries;
      } catch (error) {
        console.error("Error fetching injuries:", error);
        throw new Error("Unable to fetch injuries.");
      }
    },
    injury: async (parent, { id }) => {
      // Fetch an injury by ID
      const injury = await prisma.injury.findUnique({
        where: {
          id: id,
        },
      });

      if (!injury) {
        throw new Error(`Injury with ID ${id} not found`);
      }

      return injury;
    },
    user: async (parent, { id }) => {
      // Fetch an injury by ID
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new Error(`Injury with ID ${id} not found`);
      }

      return user;
    },
    injuriesByUserEmail: async (parent, { email }) => {
      // Fetch injuries by user email
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          injuries: true,
        },
      });

      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }

      return user.injuries;
    },
  },
  Mutation: {
    createInjury: async (parent, args, context) => {
      console.log("Incoming args:", args);
      try {
        console.log("Incoming args:", args);

        // Ensure reportedBy is provided in the args
        if (!args.reportedBy) {
          throw new Error("Missing reportedBy information.");
        }

        const injury = await prisma.injury.create({
          data: {
            ...args,
            reportedBy: {
              connect: {
                email: args.reportedBy,
              },
            },
          },
        });

        console.log("Injury created:", injury);

        return injury;
      } catch (error) {
        // Log detailed error information for debugging
        console.error("Error creating injury:", error);

        // Rethrow the error or handle it appropriately
        throw new Error("Unable to create injury.");
      }
    },
    createUser: async (_parent, { email }, context) => {
      try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          throw new Error("User with this email already exists");
        }

        // If the user doesn't exist, create a new user
        const newUser = await prisma.user.create({
          data: {
            email,
          },
        });

        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Unable to create user. " + error.message);
      }
      console.log("Exiting createUser resolver");
    },
  },
  User: {
    injuries: async (parent, args, context) => {
      try {
        const injuries = await prisma.injury.findMany({
          where: {
            reportedById: parent.id,
          },
        });

        return injuries;
      } catch (error) {
        console.error("Error fetching injuries for user:", error);
        throw new Error("Unable to fetch injuries for the user.");
      }
    },
  },
};

export default resolvers;
