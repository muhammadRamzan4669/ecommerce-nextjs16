import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import sampleData from "./figma-sample-data";
import dotenv from "dotenv"

dotenv.config()

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
})

async function main() {
  const prisma = new PrismaClient({ adapter });

  console.log('Starting database seed...');

  // Clear existing data in correct order (respecting foreign keys)
  console.log('Clearing existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();

  // Seed products
  console.log('Seeding products...');
  await prisma.product.createMany({ data: sampleData.products });
  console.log(`Created ${sampleData.products.length} products`);

  // Get all products for reviews
  const products = await prisma.product.findMany();
  
  // Create users with Better Auth compatible accounts
  console.log('Seeding users...');
  const createdUsers = [];
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
    createdUsers.push(user);

    // Create credential account for Better Auth
    await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        password: userData.password,
      },
    });
  }
  console.log(`Created ${createdUsers.length} users`);

  // Create reviews for products
  console.log('Seeding reviews...');
  let reviewCount = 0;
  
  // First, create specific reviews for "One Life Graphic T-shirt"
  const oneLifeProduct = products.find(p => p.slug === 'one-life-graphic-t-shirt');
  if (oneLifeProduct && sampleData.productReviews) {
    for (const reviewData of sampleData.productReviews) {
      const user = createdUsers.find(u => u.name === reviewData.userName);
      if (user) {
        await prisma.review.create({
          data: {
            productId: oneLifeProduct.id,
            userId: user.id,
            rating: reviewData.rating,
            title: reviewData.title,
            comment: reviewData.comment,
            isVerified: reviewData.isVerified,
            createdAt: reviewData.createdAt,
          },
        });
        reviewCount++;
      }
    }
  }
  
  // Then, create generic reviews for other products
  for (const product of products) {
    // Skip "One Life Graphic T-shirt" since we already added specific reviews
    if (product.slug === 'one-life-graphic-t-shirt') continue;
    
    // Add 3-8 reviews per product for more realistic data
    const numReviews = Math.floor(Math.random() * 6) + 3;
    for (let i = 0; i < numReviews; i++) {
      const reviewData = sampleData.reviews[Math.floor(Math.random() * sampleData.reviews.length)];
      const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      
      await prisma.review.create({
        data: {
          productId: product.id,
          userId: user.id,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment,
          isVerified: reviewData.isVerified,
        },
      });
      reviewCount++;
    }
  }
  console.log(`Created ${reviewCount} reviews`);

  // Create some sample orders for demo
  console.log('Seeding sample orders...');
  const regularUser = createdUsers.find(u => u.role === 'user');
  if (regularUser) {
    const sampleProducts = products.slice(0, 3);
    
    // Create a completed order
    const order1 = await prisma.order.create({
      data: {
        userId: regularUser.id,
        shippingAddress: {
          fullName: regularUser.name,
          streetAddress: '123 Main Street',
          city: 'New York',
          postalCode: '10001',
          country: 'United States',
          state: 'NY',
        },
        paymentMethod: 'Polar',
        paymentResult: {
          id: 'demo_payment_1',
          status: 'completed',
          email: regularUser.email,
        },
        itemsPrice: 150.00,
        shippingPrice: 0,
        taxPrice: 22.50,
        totalPrice: 172.50,
        isPaid: true,
        paidAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        isDelivered: true,
        deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: 'DELIVERED',
      },
    });

    // Create order items for order1
    for (const product of sampleProducts.slice(0, 2)) {
      await prisma.orderItem.create({
        data: {
          orderId: order1.id,
          productId: product.id,
          qty: 1,
          price: product.price,
          name: product.name,
          slug: product.slug,
          image: product.images[0],
          color: product.colors[0] || null,
          size: product.sizes[0] || null,
        },
      });
    }

    // Create a processing order
    const order2 = await prisma.order.create({
      data: {
        userId: regularUser.id,
        shippingAddress: {
          fullName: regularUser.name,
          streetAddress: '456 Oak Avenue',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'United States',
          state: 'CA',
        },
        paymentMethod: 'Polar',
        paymentResult: {
          id: 'demo_payment_2',
          status: 'completed',
          email: regularUser.email,
        },
        itemsPrice: 85.90,
        shippingPrice: 10,
        taxPrice: 14.39,
        totalPrice: 110.29,
        isPaid: true,
        paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        isDelivered: false,
        status: 'PROCESSING',
      },
    });

    // Create order items for order2
    await prisma.orderItem.create({
      data: {
        orderId: order2.id,
        productId: sampleProducts[2].id,
        qty: 1,
        price: sampleProducts[2].price,
        name: sampleProducts[2].name,
        slug: sampleProducts[2].slug,
        image: sampleProducts[2].images[0],
        color: sampleProducts[2].colors[0] || null,
        size: sampleProducts[2].sizes[0] || null,
      },
    });

    console.log('Created 2 sample orders');
  }

  // Add some newsletter subscribers
  console.log('Seeding newsletter subscribers...');
  const newsletterEmails = [
    'subscriber1@example.com',
    'subscriber2@example.com',
    'newsletter@example.com',
  ];
  
  for (const email of newsletterEmails) {
    await prisma.newsletter.create({
      data: { email },
    });
  }
  console.log(`Created ${newsletterEmails.length} newsletter subscribers`);

  console.log('Database seeded successfully!');
  
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error('Seed error:', e);
  process.exit(1);
});
