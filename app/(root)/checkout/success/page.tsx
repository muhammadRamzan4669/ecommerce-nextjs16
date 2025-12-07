import Link from 'next/link'
import { integralCF } from '@/lib/fonts'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'Order Confirmed',
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout_id?: string; session?: string }>
}) {
  const params = await searchParams
  const checkoutId = params.checkout_id || params.session
  
  // Get authenticated user
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect('/sign-in?callbackUrl=/checkout/success')
  }

  // Try to find order by checkout ID
  let order = null
  let orderStatus: 'paid' | 'pending' | 'not_found' = 'not_found'

  if (checkoutId) {
    // Look for order with this checkout ID
    order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        OR: [
          { polarCheckoutId: checkoutId },
          { id: checkoutId },
        ],
      },
      include: {
        orderItems: true,
      },
    })

    if (order) {
      orderStatus = order.isPaid ? 'paid' : 'pending'
    }
  }

  // If no order found, get the user's most recent order
  if (!order) {
    order = await prisma.order.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: true,
      },
    })

    if (order) {
      orderStatus = order.isPaid ? 'paid' : 'pending'
    }
  }

  // If still no order found, redirect to home
  if (!order) {
    redirect('/')
  }

  const orderId = order.id

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-16 lg:py-24">
      <div className="max-w-[600px] mx-auto text-center">
        {/* Success/Status Icon */}
        <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center ${
          orderStatus === 'paid' 
            ? 'bg-[#01AB31]/10' 
            : orderStatus === 'pending'
            ? 'bg-yellow-500/10'
            : 'bg-red-500/10'
        }`}>
          {orderStatus === 'paid' && (
            <CheckCircle2 className="w-12 h-12 text-[#01AB31]" />
          )}
          {orderStatus === 'pending' && (
            <Clock className="w-12 h-12 text-yellow-600" />
          )}
          {orderStatus === 'not_found' && (
            <AlertCircle className="w-12 h-12 text-red-500" />
          )}
        </div>

        {/* Title */}
        <h1 className={`${integralCF.className} text-[32px] lg:text-[48px] font-bold mb-4`}>
          {orderStatus === 'paid' && 'ORDER CONFIRMED!'}
          {orderStatus === 'pending' && 'ORDER RECEIVED!'}
          {orderStatus === 'not_found' && 'SOMETHING WENT WRONG'}
        </h1>

        {/* Message */}
        <p className="text-lg text-black/60 dark:text-white/60 mb-6">
          {orderStatus === 'paid' && 'Thank you for your purchase! Your payment has been processed successfully.'}
          {orderStatus === 'pending' && 'Your order has been created. We\'re processing your payment now.'}
          {orderStatus === 'not_found' && 'We couldn\'t find your order. Please contact support if you need assistance.'}
        </p>

        {/* Order ID */}
        <div className="bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[20px] p-6 mb-8">
          <p className="text-sm text-black/60 dark:text-white/60 mb-2">Order Reference</p>
          <p className="font-bold text-lg font-mono">{orderId.slice(0, 8)}...</p>
          {orderStatus === 'pending' && (
            <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-2">
              Payment Status: Processing
            </p>
          )}
          {orderStatus === 'paid' && (
            <p className="text-sm text-[#01AB31] mt-2">
              Payment Status: Paid
            </p>
          )}
        </div>

        {/* Order Summary */}
        {order.orderItems && order.orderItems.length > 0 && (
          <div className="text-left bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-[20px] p-6 mb-8">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {order.orderItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-black/60 dark:text-white/60">
                    {item.name} × {item.qty}
                  </span>
                  <span className="font-medium">${Number(item.price).toFixed(2)}</span>
                </div>
              ))}
              {order.orderItems.length > 3 && (
                <p className="text-sm text-black/60 dark:text-white/60">
                  +{order.orderItems.length - 3} more items
                </p>
              )}
            </div>
            <div className="border-t border-black/10 dark:border-white/10 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${Number(order.totalPrice).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        {orderStatus !== 'not_found' && (
          <div className="text-left bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-[20px] p-6 mb-8">
            <h2 className="font-bold text-lg mb-4">What happens next?</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  orderStatus === 'paid' 
                    ? 'bg-[#01AB31] text-white' 
                    : 'bg-black dark:bg-white text-white dark:text-black'
                }`}>1</span>
                <div>
                  <p className="font-medium">
                    {orderStatus === 'paid' ? 'Payment Confirmed' : 'Payment Processing'}
                  </p>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    {orderStatus === 'paid' 
                      ? 'Your payment has been successfully processed.'
                      : 'We\'re confirming your payment. This usually takes a few moments.'}
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm font-bold shrink-0">2</span>
                <div>
                  <p className="font-medium">Order Confirmation</p>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    You&apos;ll receive an email confirmation with order details.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm font-bold shrink-0">3</span>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    We&apos;ll prepare your order for shipping.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm font-bold shrink-0">4</span>
                <div>
                  <p className="font-medium">Shipping</p>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Track your order with the provided shipping number.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center h-[52px] px-8 bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/user/profile"
            className="inline-flex items-center justify-center h-[52px] px-8 border border-black/10 dark:border-white/10 rounded-[62px] text-base font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  )
}
