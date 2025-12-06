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
    <header className="w-full bg-white dark:bg-black border-b border-black/10 dark:border-white/10 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-black dark:bg-white text-white dark:text-black text-center py-[9px] text-xs md:text-sm">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-center gap-2">
          <span>Sign up and get 20% off to your first order.</span>
          <Link href="/sign-up" className="font-medium underline underline-offset-2">
            Sign Up Now
          </Link>
          <button className="ml-4 hidden md:block">
            <X className="w-4 h-4" />
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
            className={`${integralCF.className} font-bold text-[25px] lg:text-[32px]`}
          >
            SHOP.CO
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 text-base hover:text-black/70 dark:hover:text-white/70 transition-colors"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-[577px]">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full h-12 pl-12 pr-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[62px] text-base placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-3.5">
            {/* Mobile Search */}
            <button className="lg:hidden p-2">
              <Search className="w-6 h-6" />
            </button>

            <Link href="/cart" aria-label="Shopping Cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6" />
            </Link>

            <UserButton user={user} />
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
