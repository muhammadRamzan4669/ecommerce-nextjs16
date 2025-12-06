'use client'

import { addItemToCart } from '@/lib/actions/cart.actions'
import { CartItem } from '@/types'
import { Loader } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function AddToCart({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition()

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addItemToCart(item)
      
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className="w-full h-[52px] bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isPending ? (
        <>
          <Loader className="animate-spin h-5 w-5" />
          Adding...
        </>
      ) : (
        'Add to Cart'
      )}
    </button>
  )
}
