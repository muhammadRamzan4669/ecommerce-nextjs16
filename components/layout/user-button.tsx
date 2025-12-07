"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleUserRound, LogOut, User } from "lucide-react";
import { signOut } from "@/lib/actions/user.actions";
import Link from "next/link";

type UserButtonProps = {
  user: {
    name: string | null;
    email: string;
    role?: string;
  } | null;
};

export default function UserButton({ user }: UserButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsOpen(false);
    }
  };

  if (!user) {
    return (
      <Link href="/sign-in" aria-label="Sign in">
        <CircleUserRound className="size-6" />
      </Link>
    );
  }

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <CircleUserRound className="size-6" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-background border rounded-lg shadow-lg z-20">
            {/* User Info */}
            <div className="p-4 border-b">
              <div className="font-medium">{user.name || "User"}</div>
              <div className="text-sm text-muted-foreground truncate">
                {user.email}
              </div>
              {user.role && (
                <div className="text-xs text-muted-foreground mt-1 capitalize">
                  {user.role}
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                href="/user/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="size-4" />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <LogOut className="size-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
