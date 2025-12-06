'use client'

import { removeItemFromCart } from '@/lib/actions/cart.actions'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function DeleteFromCart({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await removeItemFromCart(productId)
      
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-[#FF3333] hover:bg-[#FF3333]/10 rounded-lg transition-colors disabled:opacity-50"
      aria-label="Remove item from cart"
    >
      <Trash2 className="w-5 h-5 lg:w-6 lg:h-6" />
    </button>
  )
}
