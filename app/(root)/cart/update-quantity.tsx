'use client'

import { updateItemQuantity } from '@/lib/actions/cart.actions'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function UpdateQuantity({ item }: { item: { productId: string; qty: number } }) {
  const [isPending, startTransition] = useTransition()

  const handleUpdateQuantity = (newQty: number) => {
    startTransition(async () => {
      const result = await updateItemQuantity(item.productId, newQty)
      
      if (!result.success) {
        toast.error(result.message)
      }
    })
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleUpdateQuantity(item.qty - 1)}
        disabled={isPending || item.qty <= 1}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      
      <span className="w-12 text-center font-medium">
        {item.qty}
      </span>
      
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleUpdateQuantity(item.qty + 1)}
        disabled={isPending}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  )
}
