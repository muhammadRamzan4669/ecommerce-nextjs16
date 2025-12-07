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
    const orderItems = await prisma.orderItem.deleteMany();
    console.log(`  Deleted ${orderItems.count} order items`);

    console.log("Deleting orders...");
    const orders = await prisma.order.deleteMany();
    console.log(`  Deleted ${orders.count} orders`);

    console.log("Deleting reviews...");
    const reviews = await prisma.review.deleteMany();
    console.log(`  Deleted ${reviews.count} reviews`);

    console.log("Deleting carts...");
    const carts = await prisma.cart.deleteMany();
    console.log(`  Deleted ${carts.count} carts`);

    console.log("Deleting products...");
    const products = await prisma.product.deleteMany();
    console.log(`  Deleted ${products.count} products`);

    console.log("Deleting newsletter subscribers...");
    const newsletters = await prisma.newsletter.deleteMany();
    console.log(`  Deleted ${newsletters.count} newsletter subscribers`);

    console.log("Deleting sessions...");
    const sessions = await prisma.session.deleteMany();
    console.log(`  Deleted ${sessions.count} sessions`);

    console.log("Deleting accounts...");
    const accounts = await prisma.account.deleteMany();
    console.log(`  Deleted ${accounts.count} accounts`);

    console.log("Deleting verification tokens...");
    const verifications = await prisma.verification.deleteMany();
    console.log(`  Deleted ${verifications.count} verification tokens`);

    console.log("Deleting users...");
    const users = await prisma.user.deleteMany();
    console.log(`  Deleted ${users.count} users`);

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
