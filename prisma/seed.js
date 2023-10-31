const { PrismaClient } = require('@prisma/client')
const { injuries } = require('../data/injuries.js');

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data: {
  //     email: "testt@email.com",
  //   },
  // });
  await prisma.injury.createMany({
    data: injuries
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
