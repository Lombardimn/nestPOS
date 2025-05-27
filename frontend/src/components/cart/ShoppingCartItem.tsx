import { CartItemType } from "@/schemas";
import { useShoppingCartStore } from "@/store/shoppingCart.store";
import { formatCurrency } from "@/utils";
import { XCircleIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "../ui/Button";

export default function ShoppingCartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useShoppingCartStore((state) => state.updateQuantity)
  const removeFromCart = useShoppingCartStore((state) => state.removeFromCart)

  return (
    <li className="flex items-center space-x-6 py-6 relative">
      <div className='h-24 w-24 relative'>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.image}`}
          alt={`Imagen de ${item.name}`}
          sizes="100%"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-auto space-y-2">
        <h3 className="text-gray-900">{item.name}</h3>
        <p>{formatCurrency(item.price)}</p>
        <select
          className="w-16 text-center p-2 rounded-lg bg-white border border-gray-300"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.productId, +e.target.value)}
        >
          {/** Iterar las opciones de cantidad disponibles */}
          {
            Array.from({ length: item.stock }, (_, i) => i + 1).map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))
          }
        </select>
      </div>
      <div className='absolute top-10 -right-0'>
        <Button
          variant={'delete'}
          size={'sm'}
          icons={<XCircleIcon size={32} className="text-red-500 hover:text-red-700"/>}
          method={() => removeFromCart(item.productId)}
        />
      </div>
    </li>
  )
}
