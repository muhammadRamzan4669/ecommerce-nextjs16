import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ShippingAddress } from '@/types'
import ShippingAddressForm from './shipping-address-form'
import CheckoutSteps from '@/components/checkout-steps'
import { integralCF } from '@/lib/fonts'
import Link from 'next/link'
import { getCart } from '@/lib/actions/cart.actions'
import { formatCurrency } from '@/lib/utils'
import { CartItem } from '@/types'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Checkout',
}

export default async function ShippingAddressPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in?callbackUrl=/checkout/shipping')
  }

  // Fetch user data and cart
  const [user, cart] = await Promise.all([
    import('@/lib/prisma').then(m => m.default.user.findUnique({
      where: { id: session.user.id },
      select: { address: true }
    })),
    getCart()
  ])

  const items = (cart?.items || []) as CartItem[]

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-6 lg:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 mb-6">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-black dark:hover:text-white transition-colors">Cart</Link>
        <span>/</span>
        <span className="text-black dark:text-white">Checkout</span>
      </nav>

      {/* Page Title */}
      <h1 className={`${integralCF.className} text-[32px] lg:text-[40px] font-bold mb-6`}>
        CHECKOUT
      </h1>

      {/* Checkout Steps */}
      <CheckoutSteps current={1} />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Left: Shipping Form */}
        <div className="flex-1">
          <div className="border border-black/10 dark:border-white/10 rounded-[20px] p-6">
            <h2 className="font-bold text-xl mb-6">Shipping Address</h2>
            <ShippingAddressForm address={user?.address as ShippingAddress | null} />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="border border-black/10 dark:border-white/10 rounded-[20px] p-6 sticky top-[120px]">
            <h2 className="font-bold text-xl mb-6">Order Summary</h2>
            
            {/* Cart Items Preview */}
            <div className="space-y-4 mb-6">
              {items.slice(0, 3).map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F0EEED] dark:bg-[#1F1F1F] shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-sm text-black/60 dark:text-white/60">Qty: {item.qty}</p>
                    <p className="font-bold text-sm">{formatCurrency(Number(item.price))}</p>
                  </div>
                </div>
              ))}
              {items.length > 3 && (
                <p className="text-sm text-black/60 dark:text-white/60">
                  +{items.length - 3} more items
                </p>
              )}
            </div>

            <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-black/60 dark:text-white/60">Subtotal</span>
                <span className="font-medium">{formatCurrency(Number(cart?.itemsPrice || 0))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60 dark:text-white/60">Shipping</span>
                <span className="font-medium">{formatCurrency(Number(cart?.shippingPrice || 0))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60 dark:text-white/60">Tax</span>
                <span className="font-medium">{formatCurrency(Number(cart?.taxPrice || 0))}</span>
              </div>
              <div className="border-t border-black/10 dark:border-white/10 pt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">{formatCurrency(Number(cart?.totalPrice || 0))}</span>
                </div>
              </div>
            </div>

            {/* Secure Payment Note */}
            <div className="mt-6 p-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-xl">
              <div className="flex items-center gap-2 text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Secure checkout powered by Polar.sh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
