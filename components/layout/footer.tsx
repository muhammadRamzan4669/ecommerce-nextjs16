
import { APP_NAME } from '@/lib/constants'
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return <footer className='w-full border-t flex-center p-5'>
    {currentYear} {APP_NAME}. All Rights Reserved

  </footer>
}
