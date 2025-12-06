"use server";

import { headers, cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { formatError } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { shippingAddressSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import type { CartItem } from "@/types";

/**
 * Persist session cart to user cart on sign in
 */
async function persistSessionCart(userId: string) {
  const cookieStore = await cookies();
  const sessionCartId = cookieStore.get('sessionCartId')?.value;

  if (!sessionCartId) {
    return;
  }

  try {
    // Find session cart
    const sessionCart = await prisma.cart.findFirst({
      where: { sessionCartId, userId: null },
    });

    if (!sessionCart) {
      return;
    }

    // Find existing user cart
    const userCart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (userCart) {
      // Merge session cart items with user cart
      const sessionItems = sessionCart.items as CartItem[];
      const userItems = userCart.items as CartItem[];

      // Merge items
      sessionItems.forEach((sessionItem) => {
        const existingItemIndex = userItems.findIndex(
          (item) => item.productId === sessionItem.productId
        );

        if (existingItemIndex > -1) {
          // Update quantity
          userItems[existingItemIndex].qty += sessionItem.qty;
        } else {
          // Add new item
          userItems.push(sessionItem);
        }
      });

      // Calculate prices with proper imports
      const { roundTo2 } = await import('@/lib/utils');
      const itemsPrice = roundTo2(
        userItems.reduce((acc: number, item) => acc + Number(item.price) * item.qty, 0)
      );
      const shippingPrice = roundTo2(itemsPrice > 100 ? 0 : 10);
      const taxPrice = roundTo2(0.15 * itemsPrice);
      const totalPrice = roundTo2(itemsPrice + shippingPrice + taxPrice);

      const prices = {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
      };

      // Update user cart
      await prisma.cart.update({
        where: { id: userCart.id },
        data: {
          items: JSON.parse(JSON.stringify(userItems)),
          ...prices,
        },
      });

      // Delete session cart
      await prisma.cart.delete({
        where: { id: sessionCart.id },
      });
    } else {
      // No user cart exists, convert session cart to user cart
      await prisma.cart.update({
        where: { id: sessionCart.id },
        data: { userId },
      });
    }

    logger.log('[Persist Cart] Session cart merged with user cart');
  } catch (error) {
    logger.error('[Persist Cart] Error:', error);
  }
}

/**
 * Sign up a new user with Better Auth
 */
export async function signUpWithCredentials({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
  callbackUrl?: string;
}) {
  try {
    logger.log("[Server Action] Attempting sign up for:", email);

    // Use Better Auth's server-side API to sign up
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    logger.log("[Server Action] Sign up result:", result ? "Success" : "Failed");

    if (!result || !result.user) {
      return {
        success: false,
        message: "Failed to create account. Email may already be in use.",
      };
    }

    // Set the session cookie after successful sign-up
    if (result.token) {
      const cookieStore = await cookies();
      
      logger.log("[Server Action] Setting session cookie");
      
      cookieStore.set("better-auth.session_token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    logger.log("[Server Action] Sign up successful for user:", result.user.email);

    return {
      success: true,
      message: "Account created successfully",
      user: result.user,
    };
  } catch (error: unknown) {
    logger.error("[Server Action] Sign up error:", error);
    
    return {
      success: false,
      message: formatError(error),
    };
  }
}

/**
 * Sign in with email and password using Better Auth
 */
export async function signInWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
  callbackUrl?: string;
}) {
  try {
    logger.log("[Server Action] Attempting sign in for:", email);
    
    // Use Better Auth's server-side API to sign in
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    logger.log("[Server Action] Sign in result:", result ? "Success" : "Failed");

    if (!result || !result.user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Handle users with no name - use email prefix
    if (!result.user.name || result.user.name === "no_name") {
      const nameFromEmail = result.user.email.split("@")[0];
      
      // Update user in database
      await prisma.user.update({
        where: { id: result.user.id },
        data: { name: nameFromEmail },
      });

      logger.log("[Server Action] Updated user name to:", nameFromEmail);
    }

    // Better Auth sets cookies automatically via the API handler
    // We need to manually set the session cookie in the response
    if (result.token) {
      const cookieStore = await cookies();
      
      logger.log("[Server Action] Setting session cookie");
      
      // Set the session token cookie
      cookieStore.set("better-auth.session_token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      // Persist session cart to user cart
      await persistSessionCart(result.user.id);
    }

    logger.log("[Server Action] Sign in successful for user:", result.user.email);

    return {
      success: true,
      message: "Signed in successfully",
      user: result.user,
    };
  } catch (error: unknown) {
    logger.error("[Server Action] Sign in error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Invalid email or password",
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    logger.log("[Server Action] Attempting sign out");
    
    const headersList = await headers();
    
    // Call Better Auth sign out
    await auth.api.signOut({
      headers: headersList,
    });

    // Clear the session cookie
    const cookieStore = await cookies();
    cookieStore.delete("better-auth.session_token");

    logger.log("[Server Action] Sign out successful");

    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch (error) {
    logger.error("[Server Action] Sign out error:", error);
    return {
      success: false,
      message: "An error occurred during sign out",
    };
  }
}

/**
 * Get the current session using Better Auth
 * This reads the session from headers/cookies automatically
 * Returns session with user role included
 */
export async function getSession() {
  try {
    const headersList = await headers();
    
    // Better Auth provides a helper to get session from request
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session || !session.user) {
      return null;
    }

    // Fetch user from database to get role and other custom fields
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (!user) {
      return null;
    }

    // Return session with role included - serialize for React 19
    return JSON.parse(JSON.stringify({
      ...session,
      user: {
        ...session.user,
        role: user.role,
      },
    }));
  } catch (error) {
    return null;
  }
}

/**
 * Update user shipping address
 */
export async function updateUserAddress(data: unknown) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { address },
    });

    revalidatePath('/checkout/shipping');
    revalidatePath('/user/profile');

    return {
      success: true,
      message: 'Address updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error updating address',
    };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}
