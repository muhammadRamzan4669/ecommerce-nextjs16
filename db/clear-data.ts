import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const prisma = new PrismaClient({ adapter });

  console.log("Starting database cleanup...");

  try {
    // Delete in correct order (respecting foreign keys)
    console.log("Deleting order items...");
    await prisma.orderItem.deleteMany();

    console.log("Deleting orders...");
    await prisma.order.deleteMany();

    console.log("Deleting reviews...");
    await prisma.review.deleteMany();

    console.log("Deleting carts...");
    await prisma.cart.deleteMany();

    console.log("Deleting products...");
    await prisma.product.deleteMany();

    console.log("Deleting newsletter subscribers...");
    await prisma.newsletter.deleteMany();

    console.log("Deleting sessions...");
    await prisma.session.deleteMany();

    console.log("Deleting accounts...");
    await prisma.account.deleteMany();

    console.log("Deleting verification tokens...");
    await prisma.verification.deleteMany();

    console.log("Deleting users...");
    await prisma.user.deleteMany();

    console.log("\n✅ Database cleared successfully!");
    console.log("All sample data has been removed.");

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
