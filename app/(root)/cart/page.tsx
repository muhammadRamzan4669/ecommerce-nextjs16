import { getCart } from '@/lib/actions/cart.actions'
import Image from 'next/image'
import Link from 'next/link'
import { integralCF } from '@/lib/fonts'
import { formatCurrency } from '@/lib/utils'
import { Metadata } from 'next'
import { CartItem } from '@/types'
import DeleteFromCart from './delete-from-cart'
import UpdateQuantity from './update-quantity'
import { ArrowRight, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Your Cart',
}

export default async function CartPage() {
  const cart = await getCart()

  if (!cart || !cart.items || (Array.isArray(cart.items) && cart.items.length === 0)) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-16">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-32 h-32 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-full flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/40 dark:text-white/40">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h1 className={`${integralCF.className} text-3xl lg:text-4xl font-bold`}>Your Cart is Empty</h1>
          <p className="text-black/60 dark:text-white/60 text-center max-w-md">
            Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center h-[52px] px-14 bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  const items = cart.items as CartItem[]

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-6 lg:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 mb-6">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-black dark:text-white">Cart</span>
      </nav>

      {/* Page Title */}
      <h1 className={`${integralCF.className} text-[32px] lg:text-[40px] font-bold mb-6 lg:mb-6`}>
        YOUR CART
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Cart Items */}
        <div className="flex-1 border border-black/10 dark:border-white/10 rounded-[20px] p-4 lg:p-6">
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {items.map((item, index) => (
              <div 
                key={item.productId} 
                className={`flex gap-4 ${index === 0 ? 'pb-6' : 'py-6'}`}
              >
                {/* Product Image */}
                <Link href={`/product/${item.slug}`} className="shrink-0">
                  <div className="relative w-[99px] h-[99px] lg:w-[124px] lg:h-[124px] rounded-[8px] overflow-hidden bg-[#F0EEED] dark:bg-[#1F1F1F]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="124px"
                    />
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 flex flex-col lg:flex-row lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <Link 
                        href={`/product/${item.slug}`}
                        className="font-bold text-base lg:text-xl hover:underline line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <div className="lg:hidden">
                        <DeleteFromCart productId={item.productId} />
                      </div>
                    </div>
                    
                    {/* Meta info */}
                    <div className="mt-1 space-y-1 text-sm text-black/60 dark:text-white/60">
                      <p>Size: <span className="text-black dark:text-white">Large</span></p>
                      <p>Color: <span className="text-black dark:text-white">White</span></p>
                    </div>

                    {/* Price - Mobile */}
                    <p className="mt-3 font-bold text-xl lg:hidden">
                      {formatCurrency(Number(item.price))}
                    </p>
                  </div>

                  {/* Right side: Price, Quantity, Delete - Desktop */}
                  <div className="hidden lg:flex flex-col items-end justify-between">
                    <DeleteFromCart productId={item.productId} />
                    <p className="font-bold text-2xl">
                      {formatCurrency(Number(item.price) * item.qty)}
                    </p>
                  </div>
                </div>

                {/* Quantity - Mobile */}
                <div className="lg:hidden self-end">
                  <UpdateQuantity item={item} variant="compact" />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[505px] shrink-0">
          <div className="border border-black/10 dark:border-white/10 rounded-[20px] p-5 lg:p-6">
            <h2 className="font-bold text-xl lg:text-2xl mb-6">Order Summary</h2>
            
            <div className="space-y-5">
              <div className="flex justify-between">
                <span className="text-black/60 dark:text-white/60">Subtotal</span>
                <span className="font-bold text-base lg:text-xl">{formatCurrency(Number(cart.itemsPrice))}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-black/60 dark:text-white/60">Discount (-20%)</span>
                <span className="font-bold text-base lg:text-xl text-[#FF3333]">-{formatCurrency(Number(cart.itemsPrice) * 0.2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-black/60 dark:text-white/60">Delivery Fee</span>
                <span className="font-bold text-base lg:text-xl">{formatCurrency(Number(cart.shippingPrice))}</span>
              </div>
              
              <div className="border-t border-black/10 dark:border-white/10 pt-5">
                <div className="flex justify-between">
                  <span className="text-black dark:text-white">Total</span>
                  <span className="font-bold text-xl lg:text-2xl">{formatCurrency(Number(cart.totalPrice))}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex gap-3 mt-6">
              <div className="flex-1 relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="w-full h-12 pl-11 pr-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[62px] text-base placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
                />
              </div>
              <button className="h-12 px-6 bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors">
                Apply
              </button>
            </div>

            {/* Checkout Button */}
            <Link 
              href="/checkout/shipping"
              className="mt-6 w-full h-[60px] bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors flex items-center justify-center gap-3"
            >
              Go to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
