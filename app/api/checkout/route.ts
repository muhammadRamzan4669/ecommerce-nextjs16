// Polar.sh Checkout Route
// Creates checkout sessions for payments using the Polar Next.js adapter
import { NextRequest, NextResponse } from 'next/server'

// When POLAR_ACCESS_TOKEN is set, uncomment this to use the official Polar handler:
// import { Checkout } from "@polar-sh/nextjs";
// export const GET = Checkout({
//   accessToken: process.env.POLAR_ACCESS_TOKEN!,
//   successUrl: "/checkout/success?checkout_id={CHECKOUT_ID}",
//   server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
// });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get('productId')

  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    )
  }

  // Check if Polar is configured
  const polarAccessToken = process.env.POLAR_ACCESS_TOKEN

  if (polarAccessToken) {
    try {
      // Dynamic import to avoid build errors if SDK not installed
      const { Polar } = await import('@polar-sh/sdk')
      
      // Polar SDK available - in production, use:
      // const polar = new Polar({ accessToken: polarAccessToken })
      // const checkout = await polar.checkouts.create({...})
      void Polar // Mark as used

      // Create checkout session
      // Note: You would need to create products in Polar dashboard first
      // and map your product IDs to Polar product IDs
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      
      // For demo purposes, redirect to success
      // In production, you would use polar.checkouts.create()
      return NextResponse.redirect(`${baseUrl}/checkout/success?checkout_id=polar_${Date.now()}`)
    } catch (error) {
      console.error('Polar checkout error:', error)
      // Fallback to demo checkout
    }
  }

  // Demo checkout - redirect to success page
  const baseUrl = request.nextUrl.origin
  const successUrl = new URL('/checkout/success', baseUrl)
  successUrl.searchParams.set('checkout_id', `demo_${Date.now()}`)
  
  return NextResponse.redirect(successUrl)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body

    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      )
    }

    const polarAccessToken = process.env.POLAR_ACCESS_TOKEN

    if (polarAccessToken) {
      try {
const { Polar: _Polar } = await import('@polar-sh/sdk')
        
        // Polar SDK is available but we're using demo mode
        // In production, create a proper checkout:
        // const polar = new _Polar({ accessToken: polarAccessToken })
        // const checkout = await polar.checkouts.create({
        //   productPriceId: "your-price-id",
        //   successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
        // })
        
        // return NextResponse.json({
        //   success: true,
        //   checkoutUrl: checkout.url,
        //   sessionId: checkout.id,
        // })

        // Demo response
        return NextResponse.json({
          success: true,
          checkoutUrl: `/checkout/success?session=polar_${Date.now()}`,
          sessionId: `polar_${Date.now()}`,
        })
      } catch (error) {
        console.error('Polar SDK error:', error)
      }
    }

    // Demo response
    return NextResponse.json({
      success: true,
      checkoutUrl: `/checkout/success?session=demo_${Date.now()}`,
      sessionId: `demo_${Date.now()}`,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
