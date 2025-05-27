import { cn } from '@/utils'
import { HTMLAttributes } from 'react'

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props}></div>
  )
}