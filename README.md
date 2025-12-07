# Next.js 16 E-commerce Store

A modern, production-ready e-commerce application built with Next.js 16, featuring Polar.sh payment integration, Prisma ORM, and Better Auth authentication.

## Features

- 🛒 Full e-commerce functionality (products, cart, checkout)
- 💳 **Polar.sh Payment Integration** - Secure payment processing
- 🔐 Better Auth authentication system
- 🗃️ Prisma ORM with Neon PostgreSQL
- 🎨 Tailwind CSS v4 styling
- 🌙 Dark mode support
- ⚡ React 19 with React Compiler
- 🚀 Next.js 16 with Turbopack

## Getting Started

### Prerequisites

- Node.js 20+ or Bun 1.0+
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- [Polar.sh](https://polar.sh) account for payments

### Installation

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd ecommerce-nextjs16
bun install
```

2. **Set up environment variables:**

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

3. **Configure the database:**

```bash
bunx prisma generate
bunx prisma db push
```

4. **Run the development server:**

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Polar.sh Payment Setup

This application uses [Polar.sh](https://polar.sh) for secure payment processing. Follow these steps to configure payments:

### 1. Create a Polar.sh Account

1. Go to [polar.sh](https://polar.sh) and sign up
2. Create an organization or use your personal account

### 2. Create a Product

1. Navigate to **Products** in your Polar dashboard
2. Click **Create Product**
3. Set up a product with:
   - Name: "Store Purchase" (or your preferred name)
   - Pricing: Choose "Custom Amount" for variable cart totals
   - Description: Your product description
4. Save the **Product ID** (you'll need this)

### 3. Generate an Access Token

1. Go to **Settings** → **Developers** → **Personal Access Tokens**
2. Click **Create Token**
3. Give it a name (e.g., "E-commerce Store")
4. Select required scopes:
   - `checkouts:write`
   - `checkouts:read`
   - `orders:read`
   - `customers:read`
5. Copy the generated token securely

### 4. Set Up Webhooks

1. Go to **Settings** → **Developers** → **Webhooks**
2. Click **Add Webhook**
3. Set the URL to: `https://yourdomain.com/api/webhook/polar`
4. Select the following events:
   - `checkout.created`
   - `checkout.updated`
   - `order.created`
   - `order.paid`
   - `order.refunded`
5. Copy the **Webhook Secret**

### 5. Configure Environment Variables

Add these to your `.env` file:

```env
# Polar.sh Configuration
POLAR_ACCESS_TOKEN=polar_at_xxxxxxxxxxxxx
POLAR_PRODUCT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
POLAR_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
POLAR_ENVIRONMENT=sandbox  # Use 'production' for live payments

# Application URL (required for checkout redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 6. Test Your Integration

1. Start your development server: `bun dev`
2. Visit `/api/polar/status` to check configuration
3. Add products to cart and proceed to checkout
4. Complete a test purchase using Polar's sandbox mode

### Environment Options

| Variable | Description | Required |
|----------|-------------|----------|
| `POLAR_ACCESS_TOKEN` | Your Polar API access token | ✅ Yes |
| `POLAR_PRODUCT_ID` | Product ID for checkout sessions | ✅ Yes |
| `POLAR_WEBHOOK_SECRET` | Secret for webhook signature verification | ✅ Yes (for webhooks) |
| `POLAR_ENVIRONMENT` | `sandbox` or `production` | No (defaults to `production`) |
| `NEXT_PUBLIC_BASE_URL` | Your application's base URL | Recommended |

## Project Structure

```
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (root)/              # Main application pages
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   └── product/         # Product pages
│   └── api/
│       ├── auth/            # Better Auth API routes
│       ├── checkout/        # Polar checkout API
│       ├── polar/status/    # Polar config status
│       └── webhook/polar/   # Polar webhook handler
├── components/              # React components
├── lib/
│   ├── actions/             # Server actions
│   ├── polar.ts             # Polar SDK configuration
│   ├── prisma.ts            # Database client
│   └── auth.ts              # Authentication config
└── prisma/
    └── schema.prisma        # Database schema
```

## Payment Flow

1. **Cart** → User adds products to cart
2. **Shipping** → User enters shipping address
3. **Order Creation** → Server creates order in database
4. **Checkout Session** → Polar checkout session is created
5. **Payment** → User is redirected to Polar checkout
6. **Webhook** → Polar sends payment confirmation
7. **Fulfillment** → Order is marked as paid

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/checkout` | POST | Create checkout session |
| `/api/checkout` | GET | Simple product checkout (redirect) |
| `/api/webhook/polar` | POST | Handle Polar webhooks |
| `/api/polar/status` | GET | Check Polar configuration |

## Webhook Events Handled

- `checkout.created` - Links checkout to order
- `checkout.updated` - Updates checkout status
- `order.created` - Creates order record
- `order.paid` - Marks order as paid
- `order.refunded` - Processes refunds

## Development

```bash
# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Run type checking
bun run lint

# Generate Prisma client
bunx prisma generate

# Push schema changes
bunx prisma db push
```

## Tech Stack

- **Framework:** Next.js 16.0.7
- **Runtime:** Node.js / Bun
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 7
- **Auth:** Better Auth
- **Payments:** Polar.sh SDK v0.41.5
- **UI Components:** Radix UI
- **Forms:** React Hook Form + Zod

## Troubleshooting

### Payments not working?

1. Check `/api/polar/status` for configuration status
2. Verify all environment variables are set
3. Ensure webhook URL is accessible (use ngrok for local testing)
4. Check webhook secret matches your Polar dashboard

### Webhooks not received?

1. Verify webhook URL is publicly accessible
2. Check webhook secret is correct
3. Ensure selected events match your webhook configuration
4. Review server logs for signature verification errors

### Demo mode active?

If Polar isn't configured, the app runs in demo mode:
- Checkout redirects directly to success page
- No actual payment processing occurs
- Useful for development/testing UI

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.