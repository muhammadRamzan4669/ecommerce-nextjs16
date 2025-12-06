"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-center gap-4 flex-col min-h-dvh">
      <Image
        src="/images/logo.svg"
        alt="LYNX.SHOP Logo"
        width={48}
        height={48}
        className="dark:invert-0 invert"
      />
      <h1 className="font-bold text-2xl">Page Not Found</h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="rounded-[62px] cursor-pointer bg-black text-white dark:bg-white dark:text-black px-[54px] py-[16px] font-medium text-[16px] hover:opacity-90 transition-opacity"
      >
        Back To Home
      </Link>
    </div>
  );
}
