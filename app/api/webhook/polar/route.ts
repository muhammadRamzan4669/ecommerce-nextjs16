// Polar.sh Webhook Handler
// Receives webhook events from Polar for order and subscription updates
import { NextRequest, NextResponse } from 'next/server'

// When POLAR_WEBHOOK_SECRET is set, you can use the official Polar webhook handler:
// import { Webhooks } from "@polar-sh/nextjs";
// export const POST = Webhooks({
//   webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
//   onPayload: async (payload) => {
//     console.log('Received webhook:', payload)
//   },
//   onOrderCreated: async (order) => {
//     // Handle new orders - update database, send confirmation email, etc.
//     console.log('Order created:', order)
//   },
//   onSubscriptionCreated: async (subscription) => {
//     // Handle new subscriptions
//     console.log('Subscription created:', subscription)
//   },
//   onCustomerStateChanged: async (customerState) => {
//     // Handle customer state changes
//     console.log('Customer state changed:', customerState)
//   },
// });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-polar-signature')
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET

    // Verify webhook signature in production
    if (webhookSecret) {
      if (!signature) {
        console.warn('Missing webhook signature')
        return NextResponse.json(
          { error: 'Missing signature' },
          { status: 401 }
        )
      }

      // In production with @polar-sh/nextjs, signature verification is automatic
      // For manual verification, you would use crypto to verify HMAC
    }

    // Handle different event types
    const { type, data } = body

    switch (type) {
      case 'order.created':
        console.log('Order created:', data)
        // TODO: Update order in database
        // await prisma.order.create({ ... })
        break

      case 'order.paid':
        console.log('Order paid:', data)
        // TODO: Mark order as paid, trigger fulfillment
        // await prisma.order.update({ where: { id: data.id }, data: { status: 'paid' } })
        break

      case 'order.refunded':
        console.log('Order refunded:', data)
        // TODO: Handle refund
        break

      case 'subscription.created':
        console.log('Subscription created:', data)
        // TODO: Create subscription record
        break

      case 'subscription.updated':
        console.log('Subscription updated:', data)
        // TODO: Update subscription status
        break

      case 'subscription.canceled':
        console.log('Subscription canceled:', data)
        // TODO: Handle cancellation, revoke access
        break

      case 'subscription.active':
        console.log('Subscription activated:', data)
        // TODO: Grant access
        break

      case 'customer.state.changed':
        console.log('Customer state changed:', data)
        // TODO: Update customer status
        break

      case 'checkout.created':
        console.log('Checkout created:', data)
        break

      case 'checkout.updated':
        console.log('Checkout updated:', data)
        break

      default:
        console.log('Unhandled webhook event:', type, data)
    }

    return NextResponse.json({ received: true, type })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
