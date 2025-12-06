import Link from 'next/link'
import { integralCF } from '@/lib/fonts'
import { CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed',
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout_id?: string; session?: string }>
}) {
  const params = await searchParams
  const checkoutId = params.checkout_id || params.session || 'unknown'

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-16 lg:py-24">
      <div className="max-w-[600px] mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#01AB31]/10 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-[#01AB31]" />
        </div>

        {/* Title */}
        <h1 className={`${integralCF.className} text-[32px] lg:text-[48px] font-bold mb-4`}>
          ORDER CONFIRMED!
        </h1>

        {/* Message */}
        <p className="text-lg text-black/60 dark:text-white/60 mb-6">
          Thank you for your purchase! Your order has been successfully placed.
        </p>

        {/* Order ID */}
        <div className="bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[20px] p-6 mb-8">
          <p className="text-sm text-black/60 dark:text-white/60 mb-2">Order Reference</p>
          <p className="font-bold text-lg font-mono">{checkoutId}</p>
        </div>

        {/* What's Next */}
        <div className="text-left bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-[20px] p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">What happens next?</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <div>
                <p className="font-medium">Order Confirmation</p>
                <p className="text-sm text-black/60 dark:text-white/60">You&apos;ll receive an email confirmation shortly.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <div>
                <p className="font-medium">Order Processing</p>
                <p className="text-sm text-black/60 dark:text-white/60">We&apos;ll prepare your order for shipping.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <div>
                <p className="font-medium">Shipping</p>
                <p className="text-sm text-black/60 dark:text-white/60">Track your order with the provided shipping number.</p>
              </div>
            </li>
          </ul>
        </div>

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
