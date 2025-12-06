'use server'

import { cookies, headers } from 'next/headers'
import prisma from '@/lib/prisma'
import { cartItemSchema, insertCartSchema } from '@/lib/validators'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { roundTo2 } from '@/lib/utils'
import { CartItem } from '@/types'

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = roundTo2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  )
  const shippingPrice = roundTo2(itemsPrice > 100 ? 0 : 10)
  const taxPrice = roundTo2(0.15 * itemsPrice)
  const totalPrice = roundTo2(itemsPrice + shippingPrice + taxPrice)

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }
}

// Add item to cart
export async function addItemToCart(data: CartItem) {
  try {
    // Validate cart item
    const item = cartItemSchema.parse(data)

    // Get session cart ID from cookies
    const cookieStore = await cookies()
    const sessionCartId = cookieStore.get('sessionCartId')?.value

    if (!sessionCartId) {
      throw new Error('Cart session not found')
    }

    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    // Find existing cart
    const cart = await prisma.cart.findFirst({
      where: {
        OR: [
          { sessionCartId },
          ...(session?.user?.id ? [{ userId: session.user.id }] : []),
        ],
      },
    })

    if (!cart) {
      // Create new cart
      const newCart = insertCartSchema.parse({
        items: [item],
        sessionCartId,
        userId: session?.user?.id,
        ...calcPrice([item]),
      })

      await prisma.cart.create({
        data: {
          items: newCart.items as any,
          itemsPrice: newCart.itemsPrice,
          shippingPrice: newCart.shippingPrice,
          taxPrice: newCart.taxPrice,
          totalPrice: newCart.totalPrice,
          sessionCartId: newCart.sessionCartId,
          userId: newCart.userId,
        },
      })

      revalidatePath(`/product/${item.slug}`)
      return {
        success: true,
        message: 'Item added to cart successfully',
      }
    } else {
      // Update existing cart
      const existingItems = cart.items as CartItem[]
      const existItemIndex = existingItems.findIndex(
        (x) => x.productId === item.productId
      )

      if (existItemIndex > -1) {
        // Item exists, update quantity
        existingItems[existItemIndex].qty += item.qty
      } else {
        // Add new item
        existingItems.push(item)
      }

      // Calculate new prices
      const prices = calcPrice(existingItems)

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: existingItems as any,
          ...prices,
        },
      })

      revalidatePath(`/product/${item.slug}`)
      return {
        success: true,
        message: 'Item added to cart successfully',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error adding item to cart',
    }
  }
}

// Remove item from cart
export async function removeItemFromCart(productId: string) {
  try {
    // Get session cart ID from cookies
    const cookieStore = await cookies()
    const sessionCartId = cookieStore.get('sessionCartId')?.value

    if (!sessionCartId) {
      throw new Error('Cart session not found')
    }

    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    // Find existing cart
    const cart = await prisma.cart.findFirst({
      where: {
        OR: [
          { sessionCartId },
          ...(session?.user?.id ? [{ userId: session.user.id }] : []),
        ],
      },
    })

    if (!cart) {
      throw new Error('Cart not found')
    }

    const existingItems = cart.items as CartItem[]
    const existItemIndex = existingItems.findIndex(
      (x) => x.productId === productId
    )

    if (existItemIndex === -1) {
      throw new Error('Item not found in cart')
    }

    // Decrease quantity or remove item
    if (existingItems[existItemIndex].qty > 1) {
      existingItems[existItemIndex].qty -= 1
    } else {
      existingItems.splice(existItemIndex, 1)
    }

    if (existingItems.length === 0) {
      // Delete cart if empty
      await prisma.cart.delete({
        where: { id: cart.id },
      })
    } else {
      // Update cart with new items and prices
      const prices = calcPrice(existingItems)

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: existingItems as any,
          ...prices,
        },
      })
    }

    revalidatePath(`/product/${existingItems[existItemIndex]?.slug || ''}`)
    return {
      success: true,
      message: 'Item removed from cart successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error removing item from cart',
    }
  }
}
