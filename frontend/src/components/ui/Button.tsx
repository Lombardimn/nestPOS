"use client"

import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

/** Definir las variantes del botón usando class-variance-authority */
const buttonVariants = cva(
  /** Clases base */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium hover:focus:cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gray-700 text-white shadow hover:bg-gray-700/80",
        secondary: "bg-sky-600 text-white shadow-sm hover:bg-sky-600/80",
        delete: "hover:bg-red-200/50 hover:text-red-700",
        link: "text-primary underline-offset-4 hover:underline",
        outline: "border border-input bg-transparent shadow-sm hover:bg-gray-300 hover:text-gray-700",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-auto w-auto rounded-full p-0.5",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** Tipos para las props del componente */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  className?: string
  children?: ReactNode
  icons?: ReactNode
  method?: () => void
  href?: string
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    children, 
    icons, 
    method, 
    href, 
    disabled,
    ...props 
  }, ref) => {
    const buttonClasses = cn(buttonVariants({ variant, size, className }));

    /** Contenido del botón con icono opcional */
    const buttonContent = (
      <>
        {icons && <span className="flex-shrink-0">{icons}</span>}
        {children}
      </>
    )

    /** Si es un link, usar Next.js Link */
    if (variant === "link" && href) {
      return (
        <Link 
          href={href} 
          className={buttonClasses}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {buttonContent}
        </Link>
      )
    }

    /** Si tiene href pero no es variant link, usar un enlace normal */
    if (href && variant !== "link") {
      return (
        <a 
          href={href}
          className={buttonClasses}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {buttonContent}
        </a>
      )
    }

    /** Botón normal */
    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={disabled}
        onClick={method}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }