import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "",
        destructive: "text-destructive",
        secondary: " text-gray-500",
        link: "hover:underline cursor-pointer",
        error: "text-orange-800"
      },
      size: {
        default: "text-md",
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
      },
      bold: {
        true: "font-bold"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface Props
  extends React.ButtonHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export const Text = ({className, children, variant, size, bold}:Props) => {

  return (
    <p className={cn(textVariants({ variant, size, bold, className }))}>{children}</p>
  )
}