// Polar.sh Checkout Route - Latest SDK v0.41.5
// Creates checkout sessions for payments using the official Polar SDK
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import {
  getPolarClient,
  polarConfig,
  buildSuccessUrl,
  isPolarConfigured,
} from "@/lib/polar";

/**
 * Production-ready checkout handler with:
 * - Polar.sh SDK v0.41.5 integration for secure payments
 * - Order creation with proper tracking
 * - Error handling and logging
 * - Development/production mode support
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    // Validate request
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    // Verify user is authenticated
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Get order details
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
      },
      include: {
        orderItems: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if order is already paid
    if (order.isPaid) {
      return NextResponse.json(
        { error: "Order is already paid" },
        { status: 400 },
      );
    }

    const polar = getPolarClient();

    // Check if Polar is configured for production
    if (polar && isPolarConfigured()) {
      try {
        const baseUrl = polarConfig.baseUrl || request.nextUrl.origin;

        // Success URL with checkout session ID placeholder
        const successUrl = buildSuccessUrl(baseUrl);

        // Create checkout session with Polar SDK v0.41.5
        // New API uses 'products' array instead of 'productPriceId'
        const checkout = await polar.checkouts.create({
          // Product(s) to checkout - use product ID from env
          products: [polarConfig.productId!],

          // Customer information
          customerEmail: order.user.email,
          customerName: order.user.name || undefined,

          // URLs for redirect after checkout
          successUrl: successUrl,

          // Optional: Allow discount codes
          allowDiscountCodes: true,

          // Set the checkout amount (in cents)
          // This overrides the product price for variable pricing
          amount: Math.round(Number(order.totalPrice) * 100),

          // Pass order metadata to link webhook events
          metadata: {
            orderId: order.id,
            userId: session.user.id,
            orderTotal: order.totalPrice.toString(),
            itemCount: order.orderItems.length.toString(),
          },
        });

        logger.info("Polar checkout created", {
          orderId: order.id,
          checkoutId: checkout.id,
          amount: order.totalPrice,
          checkoutUrl: checkout.url,
        });

        return NextResponse.json({
          success: true,
          checkoutUrl: checkout.url,
          checkoutId: checkout.id,
        });
      } catch (error) {
        logger.error("Polar checkout creation failed", {
          error: error instanceof Error ? error.message : "Unknown error",
          orderId: order.id,
          stack: error instanceof Error ? error.stack : undefined,
        });

        // Check for specific Polar API errors
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        return NextResponse.json(
          {
            error: "Failed to create checkout session",
            details:
              process.env.NODE_ENV === "development" ? errorMessage : undefined,
          },
          { status: 500 },
        );
      }
    }

    // Development/Demo mode - redirect directly to success page
    logger.warn("Polar not configured - using demo mode", {
      orderId: order.id,
      hasPolarToken: !!polarConfig.accessToken,
      hasPolarProduct: !!polarConfig.productId,
    });

    const baseUrl = request.nextUrl.origin;
    const demoCheckoutId = `demo_${Date.now()}_${order.id.slice(0, 8)}`;
    const successUrl = `${baseUrl}/checkout/success?checkout_id=${demoCheckoutId}`;

    return NextResponse.json({
      success: true,
      checkoutUrl: successUrl,
      checkoutId: demoCheckoutId,
      demo: true,
    });
  } catch (error) {
    logger.error("Checkout error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}

/**
 * GET handler for simple redirect-based checkouts
 * Used for direct product links with query parameters
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 },
    );
  }

  const polar = getPolarClient();

  if (polar) {
    try {
      const baseUrl = polarConfig.baseUrl || request.nextUrl.origin;
      const successUrl = buildSuccessUrl(baseUrl);

      const checkout = await polar.checkouts.create({
        products: [productId],
        successUrl: successUrl,
        allowDiscountCodes: true,
      });

      return NextResponse.redirect(checkout.url);
    } catch (error) {
      logger.error("GET checkout failed", {
        error: error instanceof Error ? error.message : "Unknown error",
        productId,
      });
    }
  }

  // Demo mode fallback
  const baseUrl = request.nextUrl.origin;
  const successUrl = new URL("/checkout/success", baseUrl);
  successUrl.searchParams.set("checkout_id", `demo_${Date.now()}`);

  return NextResponse.redirect(successUrl);
}
