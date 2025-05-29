import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/** Fusionar nombres de clase */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formatear el precio */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount)
}
