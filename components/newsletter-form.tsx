"use client";

import { useState, useTransition } from "react";
import { Mail, Loader, CheckCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter.actions";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full lg:max-w-[349px]">
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          disabled={isPending || status === "success"}
          className="w-full h-12 pl-11 pr-4 bg-white dark:bg-black text-black dark:text-white rounded-[62px] text-sm placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || status === "success"}
        className="w-full h-12 bg-white dark:bg-black text-black dark:text-white rounded-[62px] text-sm font-medium hover:bg-white/90 dark:hover:bg-black/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Subscribing...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Subscribed!
          </>
        ) : (
          "Subscribe"
        )}
      </button>

      {/* Status Message */}
      {message && (
        <p
          className={`text-sm text-center ${
            status === "error" ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
