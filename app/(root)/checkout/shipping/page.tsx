import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ShippingAddress } from '@/types'
import ShippingAddressForm from './shipping-address-form'
import CheckoutSteps from '@/components/checkout-steps'

export const metadata: Metadata = {
  title: 'Shipping Address',
}

export default async function ShippingAddressPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in?callbackUrl=/checkout/shipping')
  }

  // Fetch user data including address
  const user = await import('@/lib/prisma').then(m => m.default.user.findUnique({
    where: { id: session.user.id },
    select: { address: true }
  }))

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <CheckoutSteps current={1} />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">Shipping Address</h1>
        <ShippingAddressForm address={user?.address as ShippingAddress | null} />
      </div>
    </div>
  )
}
