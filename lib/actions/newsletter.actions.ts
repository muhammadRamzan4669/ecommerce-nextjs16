'use server'

import { prismaBase } from '@/lib/prisma'
import { newsletterSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email
    const result = newsletterSchema.safeParse({ email })
    
    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0]?.message || 'Invalid email address',
      }
    }

    // Check if already subscribed
    const existing = await prismaBase.newsletter.findUnique({
      where: { email: result.data.email },
    })

    if (existing) {
      if (existing.isActive) {
        return {
          success: false,
          message: 'You are already subscribed!',
        }
      } else {
        // Re-activate subscription
        await prismaBase.newsletter.update({
          where: { email: result.data.email },
          data: { isActive: true },
        })
        
        return {
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        }
      }
    }

    // Create new subscription
    await prismaBase.newsletter.create({
      data: { email: result.data.email },
    })

    revalidatePath('/')

    return {
      success: true,
      message: 'Thank you for subscribing!',
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    const result = newsletterSchema.safeParse({ email })
    
    if (!result.success) {
      return {
        success: false,
        message: 'Invalid email address',
      }
    }

    const existing = await prismaBase.newsletter.findUnique({
      where: { email: result.data.email },
    })

    if (!existing) {
      return {
        success: false,
        message: 'Email not found in our subscription list.',
      }
    }

    await prismaBase.newsletter.update({
      where: { email: result.data.email },
      data: { isActive: false },
    })

    return {
      success: true,
      message: 'You have been unsubscribed successfully.',
    }
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}
