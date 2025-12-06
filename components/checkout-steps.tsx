import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { name: 'Cart', href: '/cart', step: 0 },
  { name: 'Shipping', href: '/checkout/shipping', step: 1 },
  { name: 'Payment', href: '/checkout/payment', step: 2 },
  { name: 'Place Order', href: '/checkout/place-order', step: 3 },
]

export default function CheckoutSteps({ current = 0 }: { current: number }) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li
            key={step.name}
            className={cn(
              'relative',
              index !== steps.length - 1 ? 'pr-8 sm:pr-20 flex-1' : ''
            )}
          >
            {index < current ? (
              <div className="group flex items-center">
                <div className="flex items-center">
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-muted-foreground">
                    {step.name}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div className="absolute top-4 left-8 -ml-px mt-0.5 h-0.5 w-full bg-primary" />
                )}
              </div>
            ) : index === current ? (
              <div className="flex items-center">
                <span
                  className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <span className="ml-4 text-sm font-medium text-primary">
                  {step.name}
                </span>
                {index !== steps.length - 1 && (
                  <div className="absolute top-4 left-8 -ml-px mt-0.5 h-0.5 w-full bg-muted" />
                )}
              </div>
            ) : (
              <div className="group flex items-center">
                <div className="flex items-center">
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-background">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-muted-foreground">
                    {step.name}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div className="absolute top-4 left-8 -ml-px mt-0.5 h-0.5 w-full bg-muted" />
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
