import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hash, compare } from "bcrypt";
import prisma from "./prisma";

export const auth = betterAuth({
  // Database adapter with Prisma (PostgreSQL)
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    
    // Custom password hashing with bcrypt (12 salt rounds - OWASP recommended)
    password: {
      hash: async (password) => {
        return await hash(password, 12);
      },
      verify: async ({ password, hash: passwordHash }) => {
        return await compare(password, passwordHash);
      },
    },
  },

  // Security configuration
  secret: process.env.BETTER_AUTH_SECRET!,
  trustedOrigins: [process.env.BETTER_AUTH_URL!],

  // Base URL for API routes
  baseURL: process.env.BETTER_AUTH_URL!,

  // Session configuration (30 days like NextAuth example)
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days in seconds
    updateAge: 60 * 60 * 24, // Update session every 24 hours
  },

  // User configuration to include custom fields
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
});
