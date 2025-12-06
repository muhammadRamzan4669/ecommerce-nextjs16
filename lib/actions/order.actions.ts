'use server'

import { headers, cookies } from 'next/headers'
import prisma, { prismaBase } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath, updateTag } from 'next/cache'
import { CartItem } from '@/types'
import type { Prisma } from '@/lib/generated/prisma/client'

// Create order from cart
export async function createOrder() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return {
        success: false,
        message: 'Please sign in to place an order',
      }
    }

    // Get user with address
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, address: true, email: true, name: true },
    })

    if (!user?.address) {
      return {
        success: false,
        message: 'Please add a shipping address',
      }
    }

    // Get cart
    const cookieStore = await cookies()
    const sessionCartId = cookieStore.get('sessionCartId')?.value

    const cart = await prisma.cart.findFirst({
      where: {
        OR: [
          ...(sessionCartId ? [{ sessionCartId }] : []),
          { userId: session.user.id },
        ],
      },
    })

    if (!cart || !cart.items || (Array.isArray(cart.items) && cart.items.length === 0)) {
      return {
        success: false,
        message: 'Your cart is empty',
      }
    }

    const items = cart.items as CartItem[]

    // Create order
    const order = await prismaBase.order.create({
      data: {
        userId: session.user.id,
        shippingAddress: user.address as Prisma.InputJsonValue,
        paymentMethod: 'Polar',
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        status: 'PENDING',
      },
    })

    // Create order items
    for (const item of items) {
      // Get product to verify it exists
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { id: true },
      })

      if (product) {
        await prismaBase.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            qty: item.qty,
            price: item.price,
            name: item.name,
            slug: item.slug,
            image: item.image,
            color: item.color || null,
            size: item.size || null,
          },
        })
      }
    }

    // Clear cart
    await prisma.cart.delete({
      where: { id: cart.id },
    })

    revalidatePath('/cart')
    revalidatePath('/user/profile')
    updateTag('cart')

    return {
      success: true,
      message: 'Order placed successfully',
      orderId: order.id,
    }
  } catch (error) {
    console.error('Create order error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error creating order',
    }
  }
}

// Mark order as paid (called from webhook)
export async function markOrderAsPaid(orderId: string, paymentResult: { id: string; status: string; email: string }) {
  try {
    await prismaBase.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        status: 'PROCESSING',
        paymentResult: paymentResult as Prisma.InputJsonValue,
      },
    })

    revalidatePath('/user/profile')
    
    return {
      success: true,
      message: 'Order marked as paid',
    }
  } catch (error) {
    console.error('Mark order as paid error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error updating order',
    }
  }
}

// Get user orders
export async function getUserOrders() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return []
    }

    const orders = await prismaBase.order.findMany({
      where: { userId: session.user.id },
      include: {
        orderItems: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Serialize for React
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.error('Get user orders error:', error)
    return []
  }
}

// Get order by ID
export async function getOrderById(orderId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return null
    }

    const order = await prismaBase.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
      },
      include: {
        orderItems: true,
      },
    })

    if (!order) {
      return null
    }

    return JSON.parse(JSON.stringify(order))
  } catch (error) {
    console.error('Get order by ID error:', error)
    return null
  }
}

// Update order status (admin)
export async function updateOrderStatus(orderId: string, status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED') {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return {
        success: false,
        message: 'Unauthorized',
      }
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    if (user?.role !== 'admin') {
      return {
        success: false,
        message: 'Unauthorized - Admin access required',
      }
    }

    const updateData: { status: typeof status; isDelivered?: boolean; deliveredAt?: Date } = { status }

    if (status === 'DELIVERED') {
      updateData.isDelivered = true
      updateData.deliveredAt = new Date()
    }

    await prismaBase.order.update({
      where: { id: orderId },
      data: updateData,
    })

    revalidatePath('/user/profile')

    return {
      success: true,
      message: 'Order status updated',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error updating order status',
    }
  }
}
