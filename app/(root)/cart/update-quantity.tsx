'use client'

import { updateItemQuantity } from '@/lib/actions/cart.actions'
import { Minus, Plus } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

type UpdateQuantityProps = {
  item: { productId: string; qty: number }
  variant?: 'default' | 'compact'
}

export default function UpdateQuantity({ item, variant = 'default' }: UpdateQuantityProps) {
  const [isPending, startTransition] = useTransition()

  const handleUpdateQuantity = (newQty: number) => {
    startTransition(async () => {
      const result = await updateItemQuantity(item.productId, newQty)
      
      if (!result.success) {
        toast.error(result.message)
      }
    })
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between w-[105px] h-[31px] px-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[62px]">
        <button 
          onClick={() => handleUpdateQuantity(item.qty - 1)}
          disabled={isPending || item.qty <= 1}
          className="w-5 h-5 flex items-center justify-center disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-sm font-medium">{item.qty}</span>
        <button 
          onClick={() => handleUpdateQuantity(item.qty + 1)}
          disabled={isPending}
          className="w-5 h-5 flex items-center justify-center disabled:opacity-40"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between w-[126px] h-[44px] px-5 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[62px]">
      <button 
        onClick={() => handleUpdateQuantity(item.qty - 1)}
        disabled={isPending || item.qty <= 1}
        className="w-6 h-6 flex items-center justify-center disabled:opacity-40 transition-opacity"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="text-base font-medium">{item.qty}</span>
      <button 
        onClick={() => handleUpdateQuantity(item.qty + 1)}
        disabled={isPending}
        className="w-6 h-6 flex items-center justify-center disabled:opacity-40 transition-opacity"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
