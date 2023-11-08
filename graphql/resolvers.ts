import { PrismaClient } from '@prisma/client';

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
