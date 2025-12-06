"use server";

import { headers as getHeaders, cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { formatError } from "@/lib/utils";
import prisma from "@/lib/prisma";

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
    console.log("[Server Action] Attempting sign up for:", email);

    // Use Better Auth's server-side API to sign up
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    console.log("[Server Action] Sign up result:", result ? "Success" : "Failed");

    if (!result || !result.user) {
      return {
        success: false,
        message: "Failed to create account. Email may already be in use.",
      };
    }

    // Set the session cookie after successful sign-up
    if (result.token) {
      const cookieStore = await cookies();
      
      console.log("[Server Action] Setting session cookie");
      
      cookieStore.set("better-auth.session_token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    console.log("[Server Action] Sign up successful for user:", result.user.email);

    return {
      success: true,
      message: "Account created successfully",
      user: result.user,
    };
  } catch (error: any) {
    console.error("[Server Action] Sign up error:", error);
    
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
    console.log("[Server Action] Attempting sign in for:", email);
    
    // Use Better Auth's server-side API to sign in
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log("[Server Action] Sign in result:", result ? "Success" : "Failed");

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

      console.log("[Server Action] Updated user name to:", nameFromEmail);
    }

    // Better Auth sets cookies automatically via the API handler
    // We need to manually set the session cookie in the response
    if (result.token) {
      const cookieStore = await cookies();
      
      console.log("[Server Action] Setting session cookie");
      
      // Set the session token cookie
      cookieStore.set("better-auth.session_token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    console.log("[Server Action] Sign in successful for user:", result.user.email);

    return {
      success: true,
      message: "Signed in successfully",
      user: result.user,
    };
  } catch (error: any) {
    console.error("[Server Action] Sign in error:", error);
    return {
      success: false,
      message: error.message || "Invalid email or password",
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    console.log("[Server Action] Attempting sign out");
    
    const headers = await getHeaders();
    
    // Call Better Auth sign out
    await auth.api.signOut({
      headers,
    });

    // Clear the session cookie
    const cookieStore = await cookies();
    cookieStore.delete("better-auth.session_token");

    console.log("[Server Action] Sign out successful");

    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch (error) {
    console.error("[Server Action] Sign out error:", error);
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
    const headers = await getHeaders();
    
    // Better Auth provides a helper to get session from request
    const session = await auth.api.getSession({
      headers,
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

    // Return session with role included
    return {
      ...session,
      user: {
        ...session.user,
        role: user.role,
      },
    };
  } catch (error) {
    return null;
  }
}
