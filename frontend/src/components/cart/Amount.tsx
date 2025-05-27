import { formatCurrency } from "@/utils"

type AmountProps = {
  label: string
  amount: number
}

export const Amount = ({ label, amount }: AmountProps) => {
  return (
    <dl className="space-y-2 py-6 text-sm font-medium text-gray-500 flex justify-between">
      <dt className="font-bold">{label}</dt>
      <dd className="text-gray-900">{formatCurrency(amount)}</dd>
    </dl>
  )
}