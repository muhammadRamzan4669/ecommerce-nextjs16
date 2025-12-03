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

  await prisma.product.createMany({ data: sampleData.products });

  console.log('Database seeded successfully!')
}

main();
