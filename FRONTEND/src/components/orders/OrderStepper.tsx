import { cn } from '@/lib/utils';

interface OrderStepperProps {
  status: 'placed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  className?: string;
}

const steps = [
  { key: 'placed', label: 'Placed' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
];

export function OrderStepper({ status, className }: OrderStepperProps) {
  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center flex-1"
            >
              <div className="relative flex items-center w-full">
                {/* Line before */}
                {index > 0 && (
                  <div
                    className={cn(
                      "absolute left-0 right-1/2 h-0.5 -translate-y-1/2 top-4",
                      index <= currentIndex ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
                
                {/* Circle */}
                <div
                  className={cn(
                    "relative z-10 mx-auto flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-border text-muted-foreground",
                    isCurrent && "ring-4 ring-primary/20"
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Line after */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-1/2 right-0 h-0.5 -translate-y-1/2 top-4",
                      index < currentIndex ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
              
              <span
                className={cn(
                  "mt-2 text-xs text-center font-medium transition-colors",
                  isCompleted ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
