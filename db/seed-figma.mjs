import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// Figma users data
const figmaUsers = [
  {
    name: "Samantha D.",
    email: "samantha.d@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
  },
  {
    name: "Alex M.",
    email: "alex.m@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Ethan R.",
    email: "ethan.r@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
  },
  {
    name: "Olivia P.",
    email: "olivia.p@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
  {
    name: "Liam K.",
    email: "liam.k@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
  },
  {
    name: "Ava H.",
    email: "ava.h@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
  },
  {
    name: "Sarah M.",
    email: "sarah.m@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Alex K.",
    email: "alex.k@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexK",
  },
  {
    name: "James L.",
    email: "james.l@example.com",
    emailVerified: true,
    role: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    emailVerified: true,
    role: "admin",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  },
];

// Figma products data
const figmaProducts = [
  {
    name: "T-SHIRT WITH TAPE DETAILS",
    slug: "t-shirt-with-tape-details",
    category: "T-Shirts",
    brand: "SHOP.CO",
    description:
      "This modern t-shirt features unique tape details that add a contemporary edge to your casual wardrobe. Made from premium cotton for all-day comfort.",
    stock: 100,
    price: 120,
    rating: 4.5,
    numReviews: 0,
    isFeatured: true,
    banner: "/images/products/t-shirt-tape-details-banner.jpg",
    images: [
      "/images/products/t-shirt-tape-details-1.jpg",
      "/images/products/t-shirt-tape-details-2.jpg",
      "/images/products/t-shirt-tape-details-3.jpg",
    ],
    colors: ["#000000", "#FFFFFF", "#4F4631"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 0,
  },
  {
    name: "SKINNY FIT JEANS",
    slug: "skinny-fit-jeans",
    category: "Jeans",
    brand: "SHOP.CO",
    description:
      "These skinny fit jeans are designed to hug your curves while providing maximum comfort. Features a modern cut and premium denim fabric that moves with you.",
    stock: 85,
    price: 240,
    rating: 3.5,
    numReviews: 0,
    isFeatured: true,
    banner: "/images/products/skinny-fit-jeans-banner.jpg",
    images: [
      "/images/products/skinny-fit-jeans-1.jpg",
      "/images/products/skinny-fit-jeans-2.jpg",
      "/images/products/skinny-fit-jeans-3.jpg",
    ],
    colors: ["#31344F", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 20,
  },
  {
    name: "CHECKERED SHIRT",
    slug: "checkered-shirt",
    category: "Shirts",
    brand: "SHOP.CO",
    description:
      "A timeless checkered shirt that brings versatility to your wardrobe. Perfect for casual outings or smart-casual events. Made from breathable cotton blend.",
    stock: 120,
    price: 180,
    rating: 4.5,
    numReviews: 0,
    isFeatured: true,
    banner: "/images/products/checkered-shirt-banner.jpg",
    images: [
      "/images/products/checkered-shirt-1.jpg",
      "/images/products/checkered-shirt-2.jpg",
      "/images/products/checkered-shirt-3.jpg",
    ],
    colors: ["#F50606", "#31344F", "#4F4631"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 0,
  },
  {
    name: "SLEEVE STRIPED T-SHIRT",
    slug: "sleeve-striped-t-shirt",
    category: "T-Shirts",
    brand: "SHOP.CO",
    description:
      "Add a pop of style to your casual look with this sleeve striped t-shirt. Features contrasting stripes on the sleeves and a comfortable relaxed fit.",
    stock: 95,
    price: 130,
    rating: 4.5,
    numReviews: 0,
    isFeatured: true,
    banner: "/images/products/sleeve-striped-tshirt-banner.jpg",
    images: [
      "/images/products/sleeve-striped-tshirt-1.jpg",
      "/images/products/sleeve-striped-tshirt-2.jpg",
      "/images/products/sleeve-striped-tshirt-3.jpg",
    ],
    colors: ["#F57906", "#FFFFFF", "#31344F"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 30,
  },
  {
    name: "VERTICAL STRIPED SHIRT",
    slug: "vertical-striped-shirt",
    category: "Shirts",
    brand: "SHOP.CO",
    description:
      "This vertical striped shirt is a wardrobe essential that never goes out of style. Perfect for both formal and casual occasions with its classic design.",
    stock: 110,
    price: 212,
    rating: 5.0,
    numReviews: 0,
    isFeatured: true,
    banner: "/images/products/vertical-striped-shirt-banner.jpg",
    images: [
      "/images/products/vertical-striped-shirt-1.jpg",
      "/images/products/vertical-striped-shirt-2.jpg",
      "/images/products/vertical-striped-shirt-3.jpg",
    ],
    colors: ["#31344F", "#FFFFFF", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 20,
  },
  {
    name: "COURAGE GRAPHIC T-SHIRT",
    slug: "courage-graphic-t-shirt",
    category: "T-Shirts",
    brand: "SHOP.CO",
    description:
      "Make a statement with this courage graphic t-shirt. Features an inspiring design that combines style with a powerful message.",
    stock: 130,
    price: 145,
    rating: 4.0,
    numReviews: 0,
    isFeatured: true,
    banner: "/images/products/courage-graphic-tshirt-banner.jpg",
    images: [
      "/images/products/courage-graphic-tshirt-1.jpg",
      "/images/products/courage-graphic-tshirt-2.jpg",
      "/images/products/courage-graphic-tshirt-3.jpg",
    ],
    colors: ["#F57906", "#000000", "#FFFFFF"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 0,
  },
  {
    name: "LOOSE FIT BERMUDA SHORTS",
    slug: "loose-fit-bermuda-shorts",
    category: "Shorts",
    brand: "SHOP.CO",
    description:
      "Stay cool and comfortable in these loose fit bermuda shorts. Perfect for summer days and casual outings with their relaxed fit and breathable fabric.",
    stock: 75,
    price: 80,
    rating: 3.0,
    numReviews: 0,
    isFeatured: true,
    banner: "/images/products/bermuda-shorts-banner.jpg",
    images: [
      "/images/products/bermuda-shorts-1.jpg",
      "/images/products/bermuda-shorts-2.jpg",
      "/images/products/bermuda-shorts-3.jpg",
    ],
    colors: ["#4F4631", "#31344F", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 0,
  },
  {
    name: "FADED SKINNY JEANS",
    slug: "faded-skinny-jeans",
    category: "Jeans",
    brand: "SHOP.CO",
    description:
      "These faded skinny jeans offer a vintage-inspired look with modern comfort. The faded wash adds character while maintaining a sleek silhouette.",
    stock: 90,
    price: 210,
    rating: 4.5,
    numReviews: 0,
    isFeatured: true,
    banner: "/images/products/faded-skinny-jeans-banner.jpg",
    images: [
      "/images/products/faded-skinny-jeans-1.jpg",
      "/images/products/faded-skinny-jeans-2.jpg",
      "/images/products/faded-skinny-jeans-3.jpg",
    ],
    colors: ["#31344F", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 0,
  },
  {
    name: "One Life Graphic T-shirt",
    slug: "one-life-graphic-t-shirt",
    category: "T-Shirts",
    brand: "SHOP.CO",
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    stock: 150,
    price: 260,
    rating: 4.5,
    numReviews: 6,
    isFeatured: true,
    banner: "/images/products/one-life-graphic-tshirt-banner.jpg",
    images: [
      "/images/products/one-life-graphic-tshirt-1.jpg",
      "/images/products/one-life-graphic-tshirt-2.jpg",
      "/images/products/one-life-graphic-tshirt-3.jpg",
      "/images/products/one-life-graphic-tshirt-4.jpg",
    ],
    colors: ["#4F4631", "#314F4A", "#31344F"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 40,
  },
  {
    name: "Polo with Contrast Trims",
    slug: "polo-with-contrast-trims",
    category: "Polo",
    brand: "SHOP.CO",
    description:
      "Elevate your casual style with this polo featuring contrast trims. The perfect blend of sporty and sophisticated for any casual occasion.",
    stock: 105,
    price: 212,
    rating: 4.0,
    numReviews: 0,
    isFeatured: false,
    banner: "/images/products/polo-contrast-trims-banner.jpg",
    images: [
      "/images/products/polo-contrast-trims-1.jpg",
      "/images/products/polo-contrast-trims-2.jpg",
      "/images/products/polo-contrast-trims-3.jpg",
    ],
    colors: ["#7D06F5", "#F506A4", "#31344F"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 20,
  },
  {
    name: "Gradient Graphic T-shirt",
    slug: "gradient-graphic-t-shirt",
    category: "T-Shirts",
    brand: "SHOP.CO",
    description:
      "Stand out with this eye-catching gradient graphic t-shirt. Features a unique color transition design that adds a modern touch to your wardrobe.",
    stock: 115,
    price: 145,
    rating: 3.5,
    numReviews: 0,
    isFeatured: false,
    banner: "/images/products/gradient-graphic-tshirt-banner.jpg",
    images: [
      "/images/products/gradient-graphic-tshirt-1.jpg",
      "/images/products/gradient-graphic-tshirt-2.jpg",
      "/images/products/gradient-graphic-tshirt-3.jpg",
    ],
    colors: ["#F57906", "#06CAF5", "#7D06F5"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 0,
  },
  {
    name: "Polo with Tipping Details",
    slug: "polo-with-tipping-details",
    category: "Polo",
    brand: "SHOP.CO",
    description:
      "This classic polo with tipping details brings refined elegance to your casual attire. Features subtle contrast details on collar and sleeves.",
    stock: 95,
    price: 180,
    rating: 4.5,
    numReviews: 0,
    isFeatured: false,
    banner: "/images/products/polo-tipping-details-banner.jpg",
    images: [
      "/images/products/polo-tipping-details-1.jpg",
      "/images/products/polo-tipping-details-2.jpg",
      "/images/products/polo-tipping-details-3.jpg",
    ],
    colors: ["#000000", "#31344F", "#FFFFFF"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 0,
  },
  {
    name: "Black Striped T-shirt",
    slug: "black-striped-t-shirt",
    category: "T-Shirts",
    brand: "SHOP.CO",
    description:
      "A versatile black striped t-shirt that pairs well with anything. The horizontal stripes add visual interest while maintaining a classic look.",
    stock: 140,
    price: 120,
    rating: 5.0,
    numReviews: 0,
    isFeatured: false,
    banner: "/images/products/black-striped-tshirt-banner.jpg",
    images: [
      "/images/products/black-striped-tshirt-1.jpg",
      "/images/products/black-striped-tshirt-2.jpg",
      "/images/products/black-striped-tshirt-3.jpg",
    ],
    colors: ["#000000", "#FFFFFF"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    discount: 30,
  },
];

// Reviews for One Life Graphic T-shirt
const oneLifeGraphicReviews = [
  {
    rating: 5,
    title: "Absolutely love it!",
    comment:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    isVerified: true,
    createdAt: new Date("2023-08-14"),
  },
  {
    rating: 4,
    title: "Exceeded expectations!",
    comment:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    isVerified: true,
    createdAt: new Date("2023-08-15"),
  },
  {
    rating: 5,
    title: "A must-have!",
    comment:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    isVerified: true,
    createdAt: new Date("2023-08-16"),
  },
  {
    rating: 4,
    title: "Great design and comfort",
    comment:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    isVerified: true,
    createdAt: new Date("2023-08-17"),
  },
  {
    rating: 5,
    title: "Fusion of comfort and creativity",
    comment:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    isVerified: true,
    createdAt: new Date("2023-08-18"),
  },
  {
    rating: 5,
    title: "Wearing design philosophy",
    comment:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    isVerified: true,
    createdAt: new Date("2023-08-19"),
  },
];

const newsletterSubscribers = [
  { email: "subscriber1@example.com", isActive: true },
  { email: "subscriber2@example.com", isActive: true },
  { email: "subscriber3@example.com", isActive: true },
];

async function main() {
  console.log("🌱 Starting Figma-based database seeding...");

  // Clear existing data first
  console.log("🗑️  Clearing existing data...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Existing data cleared");

  // Create users
  console.log("👥 Creating users...");
  const createdUsers = [];
  for (const userData of figmaUsers) {
    const user = await prisma.user.create({
      data: userData,
    });
    createdUsers.push(user);
    console.log(`   ✓ Created user: ${user.name}`);
  }
  console.log(`✅ Created ${createdUsers.length} users`);

  // Create products
  console.log("📦 Creating products...");
  const createdProducts = [];
  for (const productData of figmaProducts) {
    const product = await prisma.product.create({
      data: productData,
    });
    createdProducts.push(product);
    console.log(`   ✓ Created product: ${product.name} ($${product.price})`);
  }
  console.log(`✅ Created ${createdProducts.length} products`);

  // Create reviews for "One Life Graphic T-shirt"
  console.log("⭐ Creating reviews for One Life Graphic T-shirt...");
  const oneLifeProduct = createdProducts.find(
    (p) => p.slug === "one-life-graphic-t-shirt",
  );

  if (oneLifeProduct) {
    const reviewers = [
      createdUsers.find((u) => u.name === "Samantha D."),
      createdUsers.find((u) => u.name === "Alex M."),
      createdUsers.find((u) => u.name === "Ethan R."),
      createdUsers.find((u) => u.name === "Olivia P."),
      createdUsers.find((u) => u.name === "Liam K."),
      createdUsers.find((u) => u.name === "Ava H."),
    ];

    let reviewCount = 0;
    for (let i = 0; i < oneLifeGraphicReviews.length; i++) {
      const reviewData = oneLifeGraphicReviews[i];
      const reviewer = reviewers[i];

      if (reviewer) {
        await prisma.review.create({
          data: {
            productId: oneLifeProduct.id,
            userId: reviewer.id,
            rating: reviewData.rating,
            title: reviewData.title,
            comment: reviewData.comment,
            isVerified: reviewData.isVerified,
            createdAt: reviewData.createdAt,
          },
        });
        reviewCount++;
        console.log(
          `   ✓ Created review by ${reviewer.name} (${reviewData.rating}⭐)`,
        );
      }
    }

    // Update product with correct numReviews and average rating
    const totalRating = oneLifeGraphicReviews.reduce(
      (sum, r) => sum + r.rating,
      0,
    );
    const avgRating = totalRating / oneLifeGraphicReviews.length;

    await prisma.product.update({
      where: { id: oneLifeProduct.id },
      data: {
        numReviews: reviewCount,
        rating: avgRating,
      },
    });

    console.log(
      `✅ Created ${reviewCount} reviews (avg rating: ${avgRating.toFixed(1)}⭐)`,
    );
  }

  // Add some reviews to other featured products
  console.log("⭐ Adding reviews to other products...");
  const otherFeaturedProducts = createdProducts.filter(
    (p) => p.isFeatured && p.slug !== "one-life-graphic-t-shirt",
  );

  let additionalReviewsCount = 0;
  for (const product of otherFeaturedProducts) {
    // Add 2-4 random reviews per product
    const numReviews = Math.floor(Math.random() * 3) + 2;
    const availableReviewers = createdUsers.filter((u) => u.role === "user");

    for (let i = 0; i < numReviews; i++) {
      const randomReviewer =
        availableReviewers[
          Math.floor(Math.random() * availableReviewers.length)
        ];
      const rating = Math.floor(Math.random() * 2) + 3; // 3-5 stars

      await prisma.review.create({
        data: {
          productId: product.id,
          userId: randomReviewer.id,
          rating: rating,
          title: "Great product!",
          comment: `Really happy with this ${product.category.toLowerCase()}. The quality is excellent and it fits perfectly.`,
          isVerified: true,
          createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
          ),
        },
      });
      additionalReviewsCount++;
    }

    // Update product stats
    const reviews = await prisma.review.findMany({
      where: { productId: product.id },
    });

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / reviews.length;

    await prisma.product.update({
      where: { id: product.id },
      data: {
        numReviews: reviews.length,
        rating: avgRating,
      },
    });
  }
  console.log(`✅ Created ${additionalReviewsCount} additional reviews`);

  // Create newsletter subscribers
  console.log("📧 Creating newsletter subscribers...");
  for (const subscriber of newsletterSubscribers) {
    await prisma.newsletter.create({
      data: subscriber,
    });
  }
  console.log(
    `✅ Created ${newsletterSubscribers.length} newsletter subscribers`,
  );

  console.log("");
  console.log("🎉 Figma-based seeding completed successfully!");
  console.log("");
  console.log("📊 Summary:");
  console.log(`   • Users: ${createdUsers.length}`);
  console.log(`   • Products: ${createdProducts.length}`);
  console.log(
    `   • Reviews: ${oneLifeGraphicReviews.length + additionalReviewsCount}`,
  );
  console.log(`   • Newsletter subscribers: ${newsletterSubscribers.length}`);
  console.log("");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
