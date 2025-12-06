import { getSession } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your profile information",
};

export default async function ProfilePage() {
  // Get the current session
  const session = await getSession();

  // If no session, redirect to sign-in (middleware should handle this, but double-check)
  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/user/profile");
  }

  const { user } = session;

  return (
    <div className="wrapper py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="border rounded-lg p-6 space-y-6 bg-card">
          {/* User Info Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              Account Information
            </h2>

            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="text-lg">{user.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-lg">{user.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Verified
                </label>
                <p className="text-lg">
                  {user.emailVerified ? (
                    <span className="text-green-600">✓ Verified</span>
                  ) : (
                    <span className="text-yellow-600">⚠ Not verified</span>
                  )}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Account Created
                </label>
                <p className="text-lg">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Protected Content Message */}
          <div className="border-t pt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>🔒 Protected Page:</strong> This page is only accessible
                to authenticated users. If you weren&apos;t signed in, the
                middleware redirected you to{" "}
                <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">
                  /sign-in?callbackUrl=/user/profile
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
