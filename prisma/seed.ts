import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/util/index";

const prisma = new PrismaClient();

async function seed() {
  const finder = await prisma.user.findUnique({
    where: {
      email: process.env.SEED_EMAIL!,
    },
  });
  if (finder) {
    throw new Error("User already exists");
  }
  await prisma.user.create({
    data: {
      email: process.env.SEED_EMAIL!,
      password: hashPassword(process.env.SEED_PASSWORD!),
      name: process.env.SEED_NAME!,
    },
  });
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
