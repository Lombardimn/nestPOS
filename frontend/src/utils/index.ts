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

/** Función auxiliar para analizar cadenas de fecha en formato DD/MM/AAAA */
export const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number)
  return new Date(year, month - 1, day)
}

/** Función auxiliar para formatear la fecha como DD/MM/AAAA */
export const formatDate = (date: Date): string => {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`
}