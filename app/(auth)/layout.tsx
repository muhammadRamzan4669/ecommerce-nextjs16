import Link from "next/link";
import { integralCF } from "@/lib/fonts";

// Static copyright year - update annually or use a client component for dynamic year
const COPYRIGHT_YEAR = 2025;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Auth Header */}
      <header className="w-full border-b">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-4">
          <Link
            href="/"
            className={`${integralCF.className} font-bold text-[25px] lg:text-[32px]`}
          >
            SHOP.CO
          </Link>
        </div>
      </header>

      {/* Auth Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Auth Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
          © {COPYRIGHT_YEAR} SHOP.CO. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
