'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shippingAddressSchema } from '@/lib/validators'
import { z } from 'zod'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateUserAddress } from '@/lib/actions/user.actions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader, ArrowRight, ArrowLeft } from 'lucide-react'

type ShippingAddress = z.infer<typeof shippingAddressSchema>

export default function ShippingAddressForm({ address }: { address?: ShippingAddress | null }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || {
      fullName: '',
      streetAddress: '',
      city: '',
      postalCode: '',
      country: '',
      state: '',
    },
  })

  const onSubmit = (data: ShippingAddress) => {
    startTransition(async () => {
      const result = await updateUserAddress(data)

      if (result.success) {
        toast.success(result.message)
        // Redirect to Polar checkout
        router.push('/api/checkout?productId=cart')
      } else {
        toast.error(result.message)
      }
    })
  }

  const inputClassName = "w-full h-12 px-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[62px] text-base placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all border-0"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black/60 dark:text-white/60">Full Name</FormLabel>
              <FormControl>
                <input 
                  placeholder="John Doe" 
                  className={inputClassName}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-[#FF3333]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black/60 dark:text-white/60">Street Address</FormLabel>
              <FormControl>
                <input 
                  placeholder="123 Main Street, Apt 4B" 
                  className={inputClassName}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-[#FF3333]" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-black/60 dark:text-white/60">City</FormLabel>
                <FormControl>
                  <input 
                    placeholder="New York" 
                    className={inputClassName}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[#FF3333]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-black/60 dark:text-white/60">State/Province</FormLabel>
                <FormControl>
                  <input 
                    placeholder="NY" 
                    className={inputClassName}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[#FF3333]" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-black/60 dark:text-white/60">Postal Code</FormLabel>
                <FormControl>
                  <input 
                    placeholder="10001" 
                    className={inputClassName}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[#FF3333]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-black/60 dark:text-white/60">Country</FormLabel>
                <FormControl>
                  <input 
                    placeholder="United States" 
                    className={inputClassName}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[#FF3333]" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="h-[52px] px-8 border border-black/10 dark:border-white/10 rounded-[62px] text-base font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 h-[52px] bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader className="animate-spin w-5 h-5" />
                Processing...
              </>
            ) : (
              <>
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </Form>
  )
}
