import Link from "next/link";
import { integralCF } from "@/lib/fonts";
import { ShoppingCart, Search, ChevronDown, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import UserButton from "./user-button";
import MobileMenu from "./mobile-menu";
import { getSession } from "@/lib/actions/user.actions";

const navLinks = [
  { name: "Shop", href: "/products", hasDropdown: true },
  { name: "On Sale", href: "/sale" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Brands", href: "/brands" },
];

export default async function Header() {
  const session = await getSession();
  const user = session?.user || null;

  return (
    <header
      className="w-full bg-white dark:bg-black border-b border-black/10 dark:border-white/10 sticky top-0 z-50"
      role="banner"
    >
      {/* Top Banner - Promotional */}
      <div
        className="bg-black dark:bg-white text-white dark:text-black text-center py-[9px] text-xs md:text-sm"
        role="complementary"
        aria-label="Promotional banner"
      >
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-center gap-2">
          <span>Sign up and get 20% off to your first order.</span>
          <Link
            href="/sign-up"
            className="font-medium underline underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-black dark:focus-visible:ring-offset-white rounded"
          >
            Sign Up Now
          </Link>
          <button
            className="ml-4 hidden md:block p-1 rounded hover:bg-white/10 dark:hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black"
            aria-label="Dismiss promotional banner"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="flex items-center justify-between h-[60px] lg:h-[93px] gap-4 lg:gap-10">
          {/* Mobile Menu Button */}
          <MobileMenu />

          {/* Logo */}
          <Link
            href="/"
            className={`${integralCF.className} font-bold text-[25px] lg:text-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 rounded`}
            aria-label="SHOP.CO - Home"
          >
            SHOP.CO
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-6"
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-6" role="menubar">
              {navLinks.map((link) => (
                <li key={link.name} role="none">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-base hover:text-black/70 dark:hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 rounded py-1"
                    role="menuitem"
                    aria-haspopup={link.hasDropdown ? "true" : undefined}
                    aria-expanded={link.hasDropdown ? "false" : undefined}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-[577px]">
            <form role="search" className="relative w-full" action="/products">
              <label htmlFor="header-search" className="sr-only">
                Search for products
              </label>
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40"
                aria-hidden="true"
              />
              <input
                id="header-search"
                type="search"
                name="q"
                placeholder="Search for products..."
                autoComplete="off"
                className="w-full h-12 pl-12 pr-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[62px] text-base placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white transition-all"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div
            className="flex items-center gap-3 lg:gap-3.5"
            role="group"
            aria-label="User actions"
          >
            {/* Mobile Search */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
              aria-label="Search products"
            >
              <Search className="w-6 h-6" aria-hidden="true" />
            </button>

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
            >
              <ShoppingCart className="w-6 h-6" aria-hidden="true" />
              {/* Cart count badge - add when cart functionality is implemented */}
              {/* <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" aria-label="3 items in cart">3</span> */}
            </Link>

            <UserButton user={user} />

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Skip to main content link - for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
    </header>
  );
}
