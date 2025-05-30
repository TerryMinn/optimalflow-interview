import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/util/index";

const prisma = new PrismaClient();

async function seed() {
  const usersData = [
    {
      email: process.env.SEED_EMAIL!,
      password: hashPassword(process.env.SEED_PASSWORD!),
      name: process.env.SEED_NAME!,
    },
    {
      email: process.env.SEED_EMAIL_S!,
      password: hashPassword(process.env.SEED_PASSWORD_S!),
      name: process.env.SEED_NAME_S!,
    },
  ];

  await prisma.transfer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: usersData });
}

seed()
  .then(() => {
    console.log("✅ Database seeded!");
  })
  .catch((error) => {
    console.error("Fatal error during seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
