import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import sampleData from "./sample-data";
import dotenv from "dotenv"

dotenv.config()

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
})

async function main() {
  const prisma = new PrismaClient({ adapter });

  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  
  // Create users with Better Auth compatible accounts
  for (const userData of sampleData.users) {
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: userData.name,
        email: userData.email,
        emailVerified: false,
        role: userData.role,
      },
    });

    // Create credential account for Better Auth
    // The password is stored in the Account model for Better Auth
    await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.id, // Use user ID as account ID for credentials
        providerId: "credential", // Better Auth uses "credential" for email/password
        password: userData.password, // Password stored in Account model
      },
    });
  }

  console.log('Database seeded successfully!')
}

main();
