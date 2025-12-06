"use client";

import { useActionState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { signInFormSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";

type FormState = {
  error?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
};

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState: FormState, formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

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
          return { fieldErrors: errors };
        }

        const result = await signInWithCredentials({
          email,
          password,
          callbackUrl,
        });

        if (result.success) {
          router.push(callbackUrl);
          router.refresh();
          return {};
        } else {
          return { error: result.message || "Invalid email or password" };
        }
      } catch (err) {
        return { error: "An error occurred. Please try again." };
      }
    },
    {}
  );

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
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@example.com"
            required
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.email}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              state.fieldErrors?.email ? "border-red-500" : ""
            }`}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="text-sm text-red-500" role="alert" aria-live="polite">
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
            aria-describedby={state.fieldErrors?.password ? "password-error" : undefined}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
              state.fieldErrors?.password ? "border-red-500" : ""
            }`}
          />
          {state.fieldErrors?.password && (
            <p id="password-error" className="text-sm text-red-500" role="alert" aria-live="polite">
              {state.fieldErrors.password}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
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
