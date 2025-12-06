'use client'

import { Button } from '@/components/ui/button'
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
    <Button
      onClick={handleAddToCart}
      disabled={isPending}
      className="w-full"
      size="lg"
    >
      {isPending ? (
        <>
          <Loader className="animate-spin mr-2 h-4 w-4" />
          Adding to cart...
        </>
      ) : (
        'Add to cart'
      )}
    </Button>
  )
}
