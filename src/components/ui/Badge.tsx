import { cn } from '#/lib/utils'

type BadgeVariant = 'discount' | 'trending' | 'bestseller' | 'new'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  discount: 'bg-red-500 text-white',
  trending: 'bg-[#6fc54d] text-white',
  bestseller: 'bg-amber-500 text-white',
  new: 'bg-blue-500 text-white',
}

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
