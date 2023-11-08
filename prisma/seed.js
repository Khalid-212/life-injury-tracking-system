const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a user
    // const user = await prisma.user.create({
    //   data: {
    //     email: "khalid@emaiel.com",
    //   },
    // });

    // Create injuries associated with the user
    const injuriesData = [
      {
        injuryDate: new Date("2023-10-31T13:32:25.998Z"),
        injuryTime: new Date("2023-10-31T13:32:29.850Z"),
        injuryList: [
          {
            bodyPart: "Head",
            description: "Head concussion",
          },
          {
            bodyPart: "Left Leg",
            description: "A slight pain at the back",
          },
          {
            bodyPart: "Left Arm",
            description: "Knife injury",
          },
        ],
        reportedById: "7b974213-27a8-4680-9194-d1f3df578e70",
      },
    ];

    await prisma.injury.createMany({
      data: injuriesData,
    });

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
