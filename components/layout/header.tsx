import Link from "next/link";
import { integralCF } from "@/lib/fonts";
import { ShoppingCart } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import UserButton from "./user-button";
import { getSession } from "@/lib/actions/user.actions";

export default async function Header() {
  const session = await getSession();
  const user = session?.user || null;

  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div
          className={`${integralCF.className} font-bold text-[25px] lg:text-[32px]`}
        >
          <Link href="/">LYNX.SHOP</Link>
        </div>
        <div className="space-x-3.5 flex-start">
          <ThemeToggle />
          <Link href="/cart" aria-label="Shopping Cart">
            <ShoppingCart className="size-6" />
          </Link>
          <UserButton user={user} />
        </div>
      </div>
    </header>
  );
}
