import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const inputVariants = cva(
  "resize-none placeholder:text-gray-500",
  {
    variants: {
      variant: {
        primary: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        ghost: "w-full border-0 bg-transparent outline-0"
      }
    }
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: any
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`${cn(inputVariants({variant}))} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export interface TextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    variant?: any
  }

const TextArea = ({ className, variant, ...props }:TextareaProps) => {
  return (
    <textarea
      className={`${cn(inputVariants({variant}))} ${className}`}
      {...props}
    />
  )
}

export { Input, TextArea }
