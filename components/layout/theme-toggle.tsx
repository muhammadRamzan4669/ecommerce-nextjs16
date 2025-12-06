"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Use useSyncExternalStore to avoid hydration mismatch
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="hover:cursor-pointer focus:outline-none"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon className="size-6" /> : <Sun className="size-6" />}
    </button>
  );
}
