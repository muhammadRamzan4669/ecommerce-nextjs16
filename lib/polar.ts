// Polar.sh Configuration Module
// Centralized configuration for Polar SDK integration
import { Polar } from "@polar-sh/sdk";

/**
 * Polar Environment Configuration
 * All Polar-related environment variables are typed and validated here
 */
export const polarConfig = {
  // Polar API Access Token (required for API calls)
  accessToken: process.env.POLAR_ACCESS_TOKEN,

  // Polar Product ID for checkout sessions
  productId: process.env.POLAR_PRODUCT_ID,

  // Webhook secret for verifying webhook signatures
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET,

  // Environment: 'sandbox' for testing, 'production' for live
  environment: (process.env.POLAR_ENVIRONMENT || "production") as
    | "sandbox"
    | "production",

  // Base URL for constructing success/cancel URLs
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
} as const;

/**
 * Check if Polar is configured for production use
 */
export function isPolarConfigured(): boolean {
  return !!(polarConfig.accessToken && polarConfig.productId);
}

/**
 * Check if Polar webhooks are configured
 */
export function isPolarWebhooksConfigured(): boolean {
  return !!polarConfig.webhookSecret;
}

/**
 * Get configured Polar client singleton
 * Returns null if not configured
 */
let polarClientInstance: Polar | null = null;

export function getPolarClient(): Polar | null {
  if (!polarConfig.accessToken) {
    return null;
  }

  if (!polarClientInstance) {
    polarClientInstance = new Polar({
      accessToken: polarConfig.accessToken,
      server: polarConfig.environment,
    });
  }

  return polarClientInstance;
}

/**
 * Create a new Polar client instance (for cases where you need a fresh instance)
 */
export function createPolarClient(): Polar | null {
  if (!polarConfig.accessToken) {
    return null;
  }

  return new Polar({
    accessToken: polarConfig.accessToken,
    server: polarConfig.environment,
  });
}

/**
 * Build success URL with checkout session ID placeholder
 * Polar replaces {CHECKOUT_SESSION_ID} with the actual checkout ID
 */
export function buildSuccessUrl(baseUrl?: string): string {
  const base = baseUrl || polarConfig.baseUrl || "";
  return `${base}/checkout/success?checkout_id={CHECKOUT_SESSION_ID}`;
}

/**
 * Build return URL for the checkout page back button
 */
export function buildReturnUrl(baseUrl?: string): string {
  const base = baseUrl || polarConfig.baseUrl || "";
  return `${base}/cart`;
}

/**
 * Validate required Polar configuration
 * Throws an error if required configuration is missing
 */
export function validatePolarConfig(): void {
  const missing: string[] = [];

  if (!polarConfig.accessToken) {
    missing.push("POLAR_ACCESS_TOKEN");
  }

  if (!polarConfig.productId) {
    missing.push("POLAR_PRODUCT_ID");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required Polar configuration: ${missing.join(", ")}. ` +
        "Please set these environment variables.",
    );
  }
}

/**
 * Get configuration status for debugging
 */
export function getPolarConfigStatus(): {
  isConfigured: boolean;
  webhooksConfigured: boolean;
  environment: string;
  hasAccessToken: boolean;
  hasProductId: boolean;
  hasWebhookSecret: boolean;
} {
  return {
    isConfigured: isPolarConfigured(),
    webhooksConfigured: isPolarWebhooksConfigured(),
    environment: polarConfig.environment,
    hasAccessToken: !!polarConfig.accessToken,
    hasProductId: !!polarConfig.productId,
    hasWebhookSecret: !!polarConfig.webhookSecret,
  };
}
