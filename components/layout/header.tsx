import Link from "next/link";
import { integralCF } from "@/lib/fonts";
import { CircleUserRound, ShoppingCart } from 'lucide-react';
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return <header className='w-full border-b'>
    <div className="wrapper flex-between">
      <div className={`${integralCF.className} font-bold text-[25px] lg:text-[32px]`}>
        <Link href='/'>LYNX.SHOP</Link>
      </div>
      <div className="space-x-3.5 flex-start">
        <ThemeToggle />
        <Link href='/'><ShoppingCart className='size-6 ' /></Link>
        <Link href='/'><CircleUserRound /></Link>
      </div >
    </div>
  </header >
}
