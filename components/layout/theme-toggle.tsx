'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react';

export default function () {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted)
    return null;

  return <button className="hover:cursor-pointer focus:outline-none" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} >{theme === 'light' ? <Moon /> : <Sun />}</button>
}
