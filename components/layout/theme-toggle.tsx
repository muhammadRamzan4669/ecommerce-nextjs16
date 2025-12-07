"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Use useSyncExternalStore to avoid hydration mismatch
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const { setTheme, resolvedTheme } = useTheme();

  // Show placeholder during SSR to prevent layout shift
  if (!mounted) {
    return (
      <div
        className="w-10 h-10 rounded-full bg-transparent"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-colors"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={isDark}
      title={`Currently in ${isDark ? "dark" : "light"} mode. Click to switch to ${nextTheme} mode.`}
    >
      <span className="sr-only">
        {isDark
          ? "Dark mode is active. Click to switch to light mode."
          : "Light mode is active. Click to switch to dark mode."}
      </span>
      {isDark ? (
        <Sun className="w-6 h-6" aria-hidden="true" />
      ) : (
        <Moon className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
}
