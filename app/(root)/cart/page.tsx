import { getCart } from '@/lib/actions/cart.actions'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Metadata } from 'next'
import { CartItem } from '@/types'
import DeleteFromCart from './delete-from-cart'
import UpdateQuantity from './update-quantity'

export const metadata: Metadata = {
  title: 'Shopping Cart',
}

export default async function CartPage() {
  const cart = await getCart()

  if (!cart || !cart.items || (Array.isArray(cart.items) && cart.items.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">Add some items to your cart to get started</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  const items = cart.items as CartItem[]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">YOUR CART</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell>
                          <Link href={`/product/${item.slug}`}>
                            <div className="relative w-20 h-20 rounded-md overflow-hidden border">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link 
                            href={`/product/${item.slug}`}
                            className="font-medium hover:underline"
                          >
                            {item.name}
                          </Link>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(item.price)}
                        </TableCell>
                        <TableCell>
                          <UpdateQuantity item={item} />
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(Number(item.price) * item.qty)}
                        </TableCell>
                        <TableCell>
                          <DeleteFromCart productId={item.productId} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(Number(cart.itemsPrice))}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping Estimate</span>
                  <span className="font-medium">{formatCurrency(Number(cart.shippingPrice))}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax Estimate</span>
                  <span className="font-medium">{formatCurrency(Number(cart.taxPrice))}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Order Total</span>
                    <span className="text-2xl font-bold">{formatCurrency(Number(cart.totalPrice))}</span>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href="/checkout/shipping">
                  Proceed to Checkout
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  Continue Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
