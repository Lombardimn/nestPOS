import { formatCurrency } from "@/utils"

type AmountProps = {
  label: string
  amount: number
  discount?: boolean
}

export const Amount = ({ label, amount, discount }: AmountProps) => {
  return (
    <dl className="font-medium text-gray-500 flex justify-between">
      <dt className="font-bold text-md">{label}</dt>
      <dd className="text-gray-900">
        {discount && '- '}  
        {formatCurrency(amount)}
      </dd>
    </dl>
  )
}