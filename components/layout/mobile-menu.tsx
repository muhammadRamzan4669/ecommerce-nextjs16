"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const navLinks = [
  { name: "Shop", href: "/products", hasDropdown: true },
  { name: "On Sale", href: "/sale" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Brands", href: "/brands" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Menu Button */}
      <button 
        className="lg:hidden p-2 -ml-2"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-black z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between h-[60px] px-4 border-b border-black/10 dark:border-white/10">
          <span className="font-bold text-lg">Menu</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
            <input
              type="search"
              placeholder="Search for products..."
              className="w-full h-12 pl-12 pr-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[62px] text-base placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between h-12 text-base font-medium hover:text-black/70 dark:hover:text-white/70 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-5 h-5" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="mx-4 my-4 border-t border-black/10 dark:border-white/10" />

        {/* Bottom Links */}
        <div className="px-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/sign-in"
                className="flex items-center h-12 text-base font-medium hover:text-black/70 dark:hover:text-white/70 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/sign-up"
                className="flex items-center h-12 text-base font-medium hover:text-black/70 dark:hover:text-white/70 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Promo Banner at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-black dark:bg-white text-white dark:text-black text-center py-3 px-4 rounded-[20px] text-sm">
            Get 20% off your first order!
            <Link 
              href="/sign-up" 
              className="block mt-1 underline underline-offset-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
