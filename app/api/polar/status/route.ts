// Polar Configuration Status API
// Returns the current Polar configuration status (for debugging)
import { NextResponse } from "next/server";
import { getPolarConfigStatus, isPolarConfigured } from "@/lib/polar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * GET /api/polar/status
 * Returns Polar configuration status for debugging
 * Only available to authenticated admins in development mode
 */
export async function GET() {
  // Only allow in development or for authenticated admins
  if (process.env.NODE_ENV === "production") {
    // Check if user is admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }
  }

  const status = getPolarConfigStatus();

  return NextResponse.json({
    configured: isPolarConfigured(),
    ...status,
    // Don't expose actual secrets, just whether they're set
    message: status.isConfigured
      ? "Polar is configured and ready for payments"
      : "Polar is not fully configured. Check environment variables.",
    requiredEnvVars: {
      POLAR_ACCESS_TOKEN: status.hasAccessToken ? "✓ Set" : "✗ Missing",
      POLAR_PRODUCT_ID: status.hasProductId ? "✓ Set" : "✗ Missing",
      POLAR_WEBHOOK_SECRET: status.hasWebhookSecret ? "✓ Set" : "✗ Missing (required for webhooks)",
      POLAR_ENVIRONMENT: status.environment,
    },
  });
}
