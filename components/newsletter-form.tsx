"use client";

import { useState, useTransition, useId } from "react";
import { Mail, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter.actions";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Generate unique IDs for accessibility
  const formId = useId();
  const inputId = `${formId}-email`;
  const statusId = `${formId}-status`;
  const descriptionId = `${formId}-description`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    startTransition(async () => {
      try {
        const result = await subscribeToNewsletter(email);

        if (result.success) {
          setStatus("success");
          setMessage(result.message);
          setEmail("");
        } else {
          setStatus("error");
          setMessage(result.message);
        }

        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3.5 w-full lg:max-w-[349px]"
      aria-labelledby={descriptionId}
      noValidate
    >
      {/* Visually hidden description for screen readers */}
      <span id={descriptionId} className="sr-only">
        Newsletter subscription form. Enter your email to receive updates about
        our latest offers.
      </span>

      <div className="relative">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <Mail
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40"
          aria-hidden="true"
        />
        <input
          id={inputId}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          disabled={isPending || status === "success"}
          aria-invalid={status === "error"}
          aria-describedby={message ? statusId : undefined}
          autoComplete="email"
          className="w-full h-12 pl-11 pr-4 bg-white dark:bg-black text-black dark:text-white rounded-[62px] text-sm placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || status === "success"}
        aria-busy={isPending}
        className="w-full h-12 bg-white dark:bg-black text-black dark:text-white rounded-[62px] text-sm font-medium hover:bg-white/90 dark:hover:bg-black/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
      >
        {isPending ? (
          <>
            <Loader className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Subscribing...</span>
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
            <span>Subscribed!</span>
          </>
        ) : (
          "Subscribe to Newsletter"
        )}
      </button>

      {/* Status Message - announced to screen readers */}
      <div
        id={statusId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="min-h-[20px]"
      >
        {message && (
          <p
            className={`text-sm text-center flex items-center justify-center gap-1.5 ${
              status === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {status === "error" && (
              <AlertCircle
                className="w-4 h-4 flex-shrink-0"
                aria-hidden="true"
              />
            )}
            {status === "success" && (
              <CheckCircle
                className="w-4 h-4 flex-shrink-0"
                aria-hidden="true"
              />
            )}
            <span>{message}</span>
          </p>
        )}
      </div>
    </form>
  );
}
