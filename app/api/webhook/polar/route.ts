// Polar.sh Webhook Handler
// Uses the official @polar-sh/nextjs Webhooks adapter for secure, type-safe webhook processing
import { Webhooks } from "@polar-sh/nextjs";
import { prismaBase } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import type { Prisma } from "@/lib/generated/prisma/client";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  // Handle checkout.created - Link checkout session to our order
  onCheckoutCreated: async (payload) => {
    const checkout = payload.data;
    logger.info("Checkout created", { checkoutId: checkout.id });

    // If metadata contains orderId, link checkout to order
    const orderId = checkout.metadata?.orderId as string | undefined;
    if (orderId) {
      try {
        // Check if already processed (idempotency)
        const existingOrder = await prismaBase.order.findUnique({
          where: { polarCheckoutId: checkout.id },
        });

        if (existingOrder) {
          logger.info("Checkout already linked (idempotent)", {
            checkoutId: checkout.id,
          });
          return;
        }

        await prismaBase.order.update({
          where: { id: orderId },
          data: {
            polarCheckoutId: checkout.id,
            polarCustomerId: checkout.customerId ?? null,
          },
        });

        logger.info("Order linked to checkout", {
          orderId,
          checkoutId: checkout.id,
        });
      } catch (error) {
        logger.error("Failed to link checkout to order", {
          error: error instanceof Error ? error.message : "Unknown error",
          checkoutId: checkout.id,
          orderId,
        });
      }
    }
  },

  // Handle checkout.updated - Track checkout status changes
  onCheckoutUpdated: async (payload) => {
    const checkout = payload.data;
    logger.info("Checkout updated", {
      checkoutId: checkout.id,
      status: checkout.status,
    });

    try {
      const order = await prismaBase.order.findUnique({
        where: { polarCheckoutId: checkout.id },
      });

      if (order && checkout.customerId) {
        await prismaBase.order.update({
          where: { id: order.id },
          data: {
            polarCustomerId: checkout.customerId,
          },
        });
      }
    } catch (error) {
      logger.error("Failed to update checkout", {
        error: error instanceof Error ? error.message : "Unknown error",
        checkoutId: checkout.id,
      });
    }
  },

  // Handle order.created - Create or update order record with Polar order ID
  onOrderCreated: async (payload) => {
    const polarOrder = payload.data;
    logger.info("Order created", {
      polarOrderId: polarOrder.id,
      checkoutId: polarOrder.checkoutId,
    });

    try {
      // Check if already processed (idempotency)
      const existingOrder = await prismaBase.order.findUnique({
        where: { polarOrderId: polarOrder.id },
      });

      if (existingOrder) {
        logger.info("Order already processed (idempotent)", {
          polarOrderId: polarOrder.id,
        });
        return;
      }

      // Find order by checkout ID
      if (polarOrder.checkoutId) {
        const order = await prismaBase.order.findUnique({
          where: { polarCheckoutId: polarOrder.checkoutId },
        });

        if (order) {
          await prismaBase.order.update({
            where: { id: order.id },
            data: {
              polarOrderId: polarOrder.id,
              polarCustomerId: polarOrder.customerId,
              paymentResult: {
                id: polarOrder.id,
                status: "created",
                amount: polarOrder.netAmount,
                currency: polarOrder.currency,
                createdAt: new Date().toISOString(),
              } as Prisma.InputJsonValue,
            },
          });

          logger.info("Order linked to Polar order", {
            orderId: order.id,
            polarOrderId: polarOrder.id,
          });
        }
      }
    } catch (error) {
      logger.error("Failed to process order.created", {
        error: error instanceof Error ? error.message : "Unknown error",
        polarOrderId: polarOrder.id,
      });
      throw error;
    }
  },

  // Handle order.paid - Mark order as paid and update status for fulfillment
  onOrderPaid: async (payload) => {
    const polarOrder = payload.data;
    logger.info("Order paid", {
      polarOrderId: polarOrder.id,
      amount: polarOrder.netAmount,
    });

    try {
      // Find order by Polar order ID
      const existingOrder = await prismaBase.order.findUnique({
        where: { polarOrderId: polarOrder.id },
      });

      if (existingOrder?.webhookProcessed) {
        logger.info("Order payment already processed (idempotent)", {
          polarOrderId: polarOrder.id,
        });
        return;
      }

      if (existingOrder) {
        await prismaBase.order.update({
          where: { id: existingOrder.id },
          data: {
            isPaid: true,
            paidAt: new Date(),
            status: "PROCESSING",
            webhookProcessed: true,
            paymentResult: {
              id: polarOrder.id,
              status: "paid",
              email: polarOrder.customer.email,
              amount: polarOrder.netAmount,
              currency: polarOrder.currency,
              paidAt: new Date().toISOString(),
            } as Prisma.InputJsonValue,
          },
        });

        logger.info("Order marked as paid", {
          orderId: existingOrder.id,
          polarOrderId: polarOrder.id,
          amount: polarOrder.netAmount,
        });

        // TODO: Send order confirmation email
        // TODO: Trigger inventory reduction
        // TODO: Notify fulfillment team
      } else {
        // Try finding by checkout ID as fallback
        if (polarOrder.checkoutId) {
          const orderByCheckout = await prismaBase.order.findUnique({
            where: { polarCheckoutId: polarOrder.checkoutId },
          });

          if (orderByCheckout) {
            await prismaBase.order.update({
              where: { id: orderByCheckout.id },
              data: {
                polarOrderId: polarOrder.id,
                polarCustomerId: polarOrder.customerId,
                isPaid: true,
                paidAt: new Date(),
                status: "PROCESSING",
                webhookProcessed: true,
                paymentResult: {
                  id: polarOrder.id,
                  status: "paid",
                  email: polarOrder.customer.email,
                  amount: polarOrder.netAmount,
                  currency: polarOrder.currency,
                  paidAt: new Date().toISOString(),
                } as Prisma.InputJsonValue,
              },
            });

            logger.info("Order found by checkout ID and marked as paid", {
              orderId: orderByCheckout.id,
              polarOrderId: polarOrder.id,
            });
            return;
          }
        }

        logger.warn("Order not found for paid event", {
          polarOrderId: polarOrder.id,
          checkoutId: polarOrder.checkoutId,
        });
      }
    } catch (error) {
      logger.error("Failed to mark order as paid", {
        error: error instanceof Error ? error.message : "Unknown error",
        polarOrderId: polarOrder.id,
      });
      throw error;
    }
  },

  // Handle order.refunded - Process refund and update order status
  onOrderRefunded: async (payload) => {
    const polarOrder = payload.data;
    logger.info("Order refunded", {
      polarOrderId: polarOrder.id,
      amount: polarOrder.netAmount,
    });

    try {
      const order = await prismaBase.order.findUnique({
        where: { polarOrderId: polarOrder.id },
      });

      if (order) {
        await prismaBase.order.update({
          where: { id: order.id },
          data: {
            status: "CANCELLED",
            paymentResult: {
              ...((order.paymentResult as Record<string, unknown>) || {}),
              refunded: true,
              refundedAt: new Date().toISOString(),
              refundAmount: polarOrder.netAmount,
            } as Prisma.InputJsonValue,
          },
        });

        logger.info("Order refunded", {
          orderId: order.id,
          polarOrderId: polarOrder.id,
          amount: polarOrder.netAmount,
        });

        // TODO: Send refund confirmation email
        // TODO: Restore inventory
      } else {
        logger.warn("Order not found for refund event", {
          polarOrderId: polarOrder.id,
        });
      }
    } catch (error) {
      logger.error("Failed to process refund", {
        error: error instanceof Error ? error.message : "Unknown error",
        polarOrderId: polarOrder.id,
      });
      throw error;
    }
  },

  // Handle subscription events for future implementation
  onSubscriptionCreated: async (payload) => {
    logger.info("Subscription created", { subscriptionId: payload.data.id });
  },

  onSubscriptionUpdated: async (payload) => {
    logger.info("Subscription updated", { subscriptionId: payload.data.id });
  },

  onSubscriptionCanceled: async (payload) => {
    logger.info("Subscription canceled", { subscriptionId: payload.data.id });
  },

  onSubscriptionRevoked: async (payload) => {
    logger.info("Subscription revoked", { subscriptionId: payload.data.id });
  },

  // Catch-all handler for any events not explicitly handled
  onPayload: async (payload) => {
    logger.info("Webhook event received", {
      type: payload.type,
      timestamp: new Date().toISOString(),
    });
  },
});
