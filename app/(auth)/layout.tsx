import Link from "next/link";
import { integralCF } from "@/lib/fonts";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Auth Header */}
      <header className="w-full border-b">
        <div className="wrapper flex-between">
          <div
            className={`${integralCF.className} font-bold text-[25px] lg:text-[32px]`}
          >
            <Link href="/">LYNX.SHOP</Link>
          </div>
        </div>
      </header>

      {/* Auth Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Auth Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="wrapper">
          © 2025 LYNX.SHOP. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
