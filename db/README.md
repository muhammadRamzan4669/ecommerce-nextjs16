# Database Seeding Documentation

This directory contains scripts for managing the database seed data for the e-commerce project.

## Overview

The project uses **Figma-based seed data** to ensure pixel-perfect alignment with the design specifications. All product data, user reviews, and other content match the Figma design file exactly.

## Files

### Seed Scripts

- **`seed-figma.mjs`** - Main seeding script using Figma-extracted data (JavaScript ES Module)
- **`seed-figma.ts`** - TypeScript version (for reference, not executable due to tsx/bun compatibility issues)
- **`seed.ts`** - Original seed script (legacy, uses sample-data.ts)
- **`clear-data.js`** - Script to clear all data from the database

### Data Files

- **`figma-data.ts`** - TypeScript file containing all Figma-extracted product data, users, and reviews
- **`figma-products.md`** - Markdown documentation of all products from the Figma design
- **`sample-data.ts`** - Original sample data (legacy, not used in Figma-based seeding)

## Quick Start

### Seed Database with Figma Data

```bash
npm run db:seed-figma
```

This will:
1. Clear all existing data (users, products, reviews, orders, etc.)
2. Create 10 users (9 regular users + 1 admin)
3. Create 13 products from the Figma design
4. Create authentic reviews for products
5. Create 3 newsletter subscribers

### Clear Database

```bash
npm run db:clear
```

This will remove all data from all tables while preserving the schema.

## Figma Design Reference

The seed data is based on this Figma design:
https://www.figma.com/design/UnmHiWQraL0AtuxKiyC1Md/E-commerce-Website-Template--Freebie---Community-

## Data Structure

### Products (13 total)

#### New Arrivals (4 products)
1. **T-SHIRT WITH TAPE DETAILS** - $120 (4.5⭐)
2. **SKINNY FIT JEANS** - $240, was $260 (-20%, 3.5⭐)
3. **CHECKERED SHIRT** - $180 (4.5⭐)
4. **SLEEVE STRIPED T-SHIRT** - $130, was $160 (-30%, 4.5⭐)

#### Top Selling (4 products)
5. **VERTICAL STRIPED SHIRT** - $212, was $232 (-20%, 5.0⭐)
6. **COURAGE GRAPHIC T-SHIRT** - $145 (4.0⭐)
7. **LOOSE FIT BERMUDA SHORTS** - $80 (3.0⭐)
8. **FADED SKINNY JEANS** - $210 (4.5⭐)

#### Featured Product
9. **One Life Graphic T-shirt** - $260, was $300 (-40%, 4.7⭐, 6 reviews)
   - This is the main product detail page example
   - Has 6 detailed, authentic reviews from real users
   - Available in 3 colors: Olive Green, Dark Green, Navy Blue
   - Sizes: Small, Medium, Large, X-Large

#### You Might Also Like (4 products)
10. **Polo with Contrast Trims** - $212, was $242 (-20%, 4.0⭐)
11. **Gradient Graphic T-shirt** - $145 (3.5⭐)
12. **Polo with Tipping Details** - $180 (4.5⭐)
13. **Black Striped T-shirt** - $120, was $150 (-30%, 5.0⭐)

### Users (10 total)

9 regular users:
- Samantha D.
- Alex M.
- Ethan R.
- Olivia P.
- Liam K.
- Ava H.
- Sarah M.
- Alex K.
- James L.

1 admin user:
- Admin User (admin@example.com)

All users have:
- Verified email addresses
- Avatar images (from DiceBear API)
- Proper roles (user/admin)

### Reviews

- **32 total reviews** across all products
- **6 detailed reviews** for "One Life Graphic T-shirt" (the featured product)
- **26 additional reviews** distributed across other featured products
- All reviews are marked as verified
- Reviews include realistic dates, ratings (3-5 stars), titles, and detailed comments

### Product Features

All products include:
- Name, slug, category, brand
- Description
- Stock quantity
- Price (with optional discount)
- Rating and review count
- Featured flag (for homepage display)
- Banner image
- Multiple product images (3-4 per product)
- Color options (hex codes)
- Size options (Small, Medium, Large, X-Large)

## Categories

Products are organized into these categories:
- T-Shirts (6 products)
- Jeans (2 products)
- Shirts (2 products)
- Shorts (1 product)
- Polo (2 products)

## Brand

All products are branded as **SHOP.CO**

## Color Palette

The seed data includes these colors across products:
- Black (#000000)
- White (#FFFFFF)
- Olive Green (#4F4631)
- Dark Green (#314F4A)
- Navy Blue (#31344F)
- Red (#F50606)
- Orange (#F57906)
- Purple (#7D06F5)
- Pink (#F506A4)
- Cyan (#06CAF5)

## Price Range

- Minimum: $80 (Bermuda Shorts)
- Maximum: $260 (One Life Graphic T-shirt, original $300)
- Average discount: 20-40% on sale items

## Technical Details

### Script Execution

The `seed-figma.mjs` script uses:
- ES Module syntax (`.mjs` extension)
- Prisma Client with Neon adapter
- Direct import from generated Prisma client
- Environment variables via dotenv

### Database Operations

The seed script performs operations in this order:
1. Deletes all existing data (in foreign-key-safe order)
2. Creates users
3. Creates products
4. Creates reviews for "One Life Graphic T-shirt"
5. Creates additional reviews for other featured products
6. Updates product statistics (numReviews, average rating)
7. Creates newsletter subscribers

### Error Handling

- The script will exit with code 1 if any error occurs
- Prisma client is properly disconnected on both success and error
- All operations are logged to console with emoji indicators

## Next Steps

After seeding:
1. **Add Product Images** - The seed data references image paths in `/images/products/`. You'll need to:
   - Export images from Figma
   - Place them in `public/images/products/`
   - Or update image paths to use external URLs

2. **Test the Application** - Verify that:
   - Homepage shows New Arrivals and Top Selling products correctly
   - Product detail page displays "One Life Graphic T-shirt" with all reviews
   - Colors and sizes are displayed properly
   - Discounts are calculated correctly

3. **Customize as Needed** - The seed data can be modified by editing:
   - `db/figma-data.ts` for TypeScript definitions
   - `db/seed-figma.mjs` for the actual executable script

## Troubleshooting

### Script won't run
- Ensure Prisma client is generated: `npx prisma generate`
- Check DATABASE_URL in `.env` file
- Use Node.js (not tsx/bun) to run the .mjs file

### Database errors
- Clear the database first: `npm run db:clear`
- Check database connection
- Verify schema is up to date: `npx prisma migrate dev`

### Missing images
- Product images are referenced but not included in the repo
- Export from Figma or use placeholder images
- Update image paths in `db/figma-data.ts` if using external URLs

## Maintenance

When updating seed data:
1. Edit `db/figma-data.ts` with new product information
2. Update `db/figma-products.md` documentation
3. Copy changes to `db/seed-figma.mjs` if needed
4. Run `npm run db:seed-figma` to test
5. Commit all changes to version control

---

**Last Updated**: December 2024  
**Figma Design Version**: Community Freebie  
**Database**: PostgreSQL (Neon)  
**ORM**: Prisma 7.1.0