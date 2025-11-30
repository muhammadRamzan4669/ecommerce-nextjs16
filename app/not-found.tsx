'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return <div className="flex-center gap-4 flex-col min-h-dvh">
    <Image src='images/logo.svg' alt='logo' width='48' height='48' className="dark:invert-0 invert" />
    <h1 className='font-bold'>Page Not Found</h1>
    <button className="rounded-[62px] cursor-pointer bg-black text-white dark:bg-white dark:text-black px-[54] py-[16] font-medium text-[16px]" onClick={() => (window.location.href = '/')}>Back To Home</button>


  </div>
}
