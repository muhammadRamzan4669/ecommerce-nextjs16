import { Check } from 'lucide-react'

const steps = [
  { name: 'Cart', step: 0 },
  { name: 'Shipping', step: 1 },
  { name: 'Payment', step: 2 },
  { name: 'Confirmation', step: 3 },
]

export default function CheckoutSteps({ current = 0 }: { current: number }) {
  return (
    <nav aria-label="Checkout progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li
            key={step.name}
            className="relative flex-1 flex items-center"
          >
            {/* Step circle and label */}
            <div className="flex flex-col items-center relative z-10">
              {index < current ? (
                // Completed step
                <span className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
                  <Check className="w-5 h-5 text-white dark:text-black" />
                </span>
              ) : index === current ? (
                // Current step
                <span
                  className="w-10 h-10 rounded-full border-2 border-black dark:border-white bg-transparent flex items-center justify-center"
                  aria-current="step"
                >
                  <span className="w-3 h-3 rounded-full bg-black dark:bg-white" />
                </span>
              ) : (
                // Future step
                <span className="w-10 h-10 rounded-full border-2 border-black/20 dark:border-white/20 bg-transparent flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-black/20 dark:bg-white/20" />
                </span>
              )}
              <span
                className={`mt-2 text-xs sm:text-sm font-medium ${
                  index <= current
                    ? 'text-black dark:text-white'
                    : 'text-black/40 dark:text-white/40'
                }`}
              >
                {step.name}
              </span>
            </div>

            {/* Connecting line */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-0.5 ${
                  index < current
                    ? 'bg-black dark:bg-white'
                    : 'bg-black/20 dark:bg-white/20'
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
