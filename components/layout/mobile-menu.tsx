"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLInputElement>(null);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus the close button when menu opens
      closeButtonRef.current?.focus();
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
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        // Return focus to the open button
        openButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Focus trap within the menu
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Return focus to the open button after close
    setTimeout(() => {
      openButtonRef.current?.focus();
    }, 100);
  }, []);

  return (
    <>
      {/* Menu Button */}
      <button
        ref={openButtonRef}
        className="lg:hidden p-2 -ml-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        aria-haspopup="dialog"
      >
        <Menu className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        id="mobile-navigation-menu"
        className={`fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-black z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        onKeyDown={handleKeyDown}
        inert={!isOpen ? ("" as unknown as boolean) : undefined}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between h-[60px] px-4 border-b border-black/10 dark:border-white/10">
          <span className="font-bold text-lg" id="mobile-menu-title">
            Menu
          </span>
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="p-2 -mr-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4">
          <form role="search" action="/products" className="relative">
            <label htmlFor="mobile-search" className="sr-only">
              Search for products
            </label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40"
              aria-hidden="true"
            />
            <input
              ref={firstFocusableRef}
              id="mobile-search"
              type="search"
              name="q"
              placeholder="Search for products..."
              autoComplete="off"
              className="w-full h-12 pl-12 pr-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[62px] text-base placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white transition-all"
            />
          </form>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Mobile navigation">
          <ul className="px-4 space-y-1" role="menu">
            {navLinks.map((link) => (
              <li key={link.name} role="none">
                <Link
                  href={link.href}
                  className="flex items-center justify-between h-12 text-base font-medium hover:text-black/70 dark:hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-inset rounded-md px-2 -mx-2"
                  onClick={handleClose}
                  role="menuitem"
                  aria-haspopup={link.hasDropdown ? "true" : undefined}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div
          className="mx-4 my-4 border-t border-black/10 dark:border-white/10"
          role="separator"
          aria-hidden="true"
        />

        {/* Account Links */}
        <nav aria-label="Account navigation">
          <ul className="px-4 space-y-1" role="menu">
            <li role="none">
              <Link
                href="/sign-in"
                className="flex items-center h-12 text-base font-medium hover:text-black/70 dark:hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-inset rounded-md px-2 -mx-2"
                onClick={handleClose}
                role="menuitem"
              >
                Sign In
              </Link>
            </li>
            <li role="none">
              <Link
                href="/sign-up"
                className="flex items-center h-12 text-base font-medium hover:text-black/70 dark:hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-inset rounded-md px-2 -mx-2"
                onClick={handleClose}
                role="menuitem"
              >
                Create Account
              </Link>
            </li>
          </ul>
        </nav>

        {/* Promo Banner at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div
            className="bg-black dark:bg-white text-white dark:text-black text-center py-3 px-4 rounded-[20px] text-sm"
            role="complementary"
            aria-label="Promotional offer"
          >
            <p>Get 20% off your first order!</p>
            <Link
              href="/sign-up"
              className="block mt-1 underline underline-offset-2 font-medium hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black rounded"
              onClick={handleClose}
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
