'use client'

import { removeItemFromCart } from '@/lib/actions/cart.actions'
import { Button } from '@/components/ui/button'
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
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete item</span>
    </Button>
  )
}
