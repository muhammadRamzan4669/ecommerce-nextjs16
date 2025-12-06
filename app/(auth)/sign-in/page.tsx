"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { signInFormSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setIsLoading(true);

    try {
      // Validate form with Zod
      const validationResult = signInFormSchema.safeParse({
        email,
        password,
      });

      if (!validationResult.success) {
        const errors: { email?: string; password?: string } = {};
        validationResult.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as "email" | "password"] = issue.message;
          }
        });
        setFieldErrors(errors);
        setIsLoading(false);
        return;
      }

      const result = await signInWithCredentials({
        email,
        password,
        callbackUrl,
      });

      if (result.success) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError(result.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              fieldErrors.email ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.email && (
            <p className="text-sm text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              fieldErrors.password ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.password && (
            <p className="text-sm text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* Test Credentials Hint */}
      <div className="text-xs text-center text-muted-foreground p-3 bg-muted/30 rounded-md">
        <p className="font-medium mb-1">Test Credentials:</p>
        <p>Admin: admin@example.com / 123456</p>
        <p>User: user@example.com / 123456</p>
      </div>

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don&apos;t have an account? </span>
        <Link
          href="/sign-up"
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
