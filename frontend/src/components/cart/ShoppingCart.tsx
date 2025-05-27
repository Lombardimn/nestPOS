"use client"

import { useShoppingCartStore } from "@/store/shoppingCart.store";
import ShoppingCartItem from "./ShoppingCartItem";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { Amount } from "./Amount";

export default function ShoppingCartStore() {
  const contents = useShoppingCartStore((state) => state.contents)
  const total = useShoppingCartStore((state) => state.total)

  return (
    <>
      <h2 className="text-4xl font-bold text-gray-900">Resumen de venta</h2>

      {
        contents.length
          ? (
            <>
              <div className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
                <ul role="list" className="text-sm font-medium text-gray-500">
                  {
                    contents.map((item) => (
                      <ShoppingCartItem key={item.productId} item={item} />
                    ))
                  }
                </ul>
              </div>

              <div className="mt-6 divide-y divide-gray-200 border-t border-gray-300">
                <Amount label="Total a pagar" amount={total} />
              </div>
            </>
          )
          : (
            <div className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
              <div className="flex flex-col items-center justify-center gap-4 mt-16">
                <ShoppingCartIcon size={64} weight="duotone" />
                <p className="text-2xl font-bold text-balance">No hay productos en el carrito</p>
              </div>
            </div>
          )
      }
    </>
  )
}