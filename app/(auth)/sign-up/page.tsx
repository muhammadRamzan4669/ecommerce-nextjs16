"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signUpWithCredentials } from "@/lib/actions/user.actions";
import { signUpFormSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setIsLoading(true);

    try {
      // Validate form with Zod
      const validationResult = signUpFormSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
      });

      if (!validationResult.success) {
        // Extract field errors from Zod
        const errors: {
          name?: string;
          email?: string;
          password?: string;
          confirmPassword?: string;
        } = {};
        validationResult.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[
              issue.path[0] as "name" | "email" | "password" | "confirmPassword"
            ] = issue.message;
          }
        });
        setFieldErrors(errors);
        setIsLoading(false);
        return;
      }

      const result = await signUpWithCredentials({
        name,
        email,
        password,
        callbackUrl,
      });

      if (result.success) {
        // Redirect to callback URL after successful sign-up
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError(result.message || "Failed to create account");
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
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              fieldErrors.name ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.name && (
            <p className="text-sm text-red-500">{fieldErrors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
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

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              fieldErrors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-sm text-red-500">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link
          href="/sign-in"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
