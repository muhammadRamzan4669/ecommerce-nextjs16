"use client";

import { useActionState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signUpWithCredentials } from "@/lib/actions/user.actions";
import { signUpFormSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";

type FormState = {
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState: FormState, formData: FormData) => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

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
                issue.path[0] as
                  | "name"
                  | "email"
                  | "password"
                  | "confirmPassword"
              ] = issue.message;
            }
          });
          return { fieldErrors: errors };
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
          return {};
        } else {
          return { error: result.message || "Failed to create account" };
        }
      } catch {
        return { error: "An error occurred. Please try again." };
      }
    },
    {},
  );

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
      <form action={formAction} className="space-y-4">
        {state.error && (
          <div
            className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md"
            role="alert"
            aria-live="assertive"
          >
            {state.error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.name}
            aria-describedby={
              state.fieldErrors?.name ? "name-error" : undefined
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              state.fieldErrors?.name ? "border-red-500" : ""
            }`}
          />
          {state.fieldErrors?.name && (
            <p
              id="name-error"
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.email}
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              state.fieldErrors?.email ? "border-red-500" : ""
            }`}
          />
          {state.fieldErrors?.email && (
            <p
              id="email-error"
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            required
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.password}
            aria-describedby={
              state.fieldErrors?.password ? "password-error" : undefined
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              state.fieldErrors?.password ? "border-red-500" : ""
            }`}
          />
          {state.fieldErrors?.password && (
            <p
              id="password-error"
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {state.fieldErrors.password}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••"
            required
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.confirmPassword}
            aria-describedby={
              state.fieldErrors?.confirmPassword
                ? "confirmPassword-error"
                : undefined
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              state.fieldErrors?.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {state.fieldErrors?.confirmPassword && (
            <p
              id="confirmPassword-error"
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {state.fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating account..." : "Create Account"}
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
