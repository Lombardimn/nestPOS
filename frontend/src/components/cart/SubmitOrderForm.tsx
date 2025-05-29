"use client"

import { submitOrder } from "@/actions/submitOrder.action"
import { OrderType } from "@/schemas"
import { useShoppingCartStore } from "@/store/shoppingCart.store"
import { SealCheckIcon, SirenIcon } from "@phosphor-icons/react"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

export const SubmitOrderForm = () => {
  /** Extraer los valores del Store */
  const total = useShoppingCartStore((state) => state.total)
  const coupon = useShoppingCartStore((state) => state.coupon.name)
  const contents = useShoppingCartStore((state) => state.contents)
  const clearCart = useShoppingCartStore((state) => state.clearCart)

  /** Crear la orden */
  const order: OrderType = {
    total,
    coupon,
    contents
  }
  
  /** Generar la acción */
  const submitOrderWithData = submitOrder.bind(null, order)
  const [state, dispacht] = useActionState(submitOrderWithData, {
    errors: [],
    success: ''
  })

  /** Notificaciones */
  useEffect(() => {
    const successMsg = typeof state.success === 'string'
      ? state.success
      : state.success.message;

    if (state.errors && state.errors.length > 0) {
      state.errors.forEach((errMsg) => {
        toast.error('Ups! Hubo un Error', {
          description: errMsg,
          duration: 3000,
          icon: <SirenIcon size={24} weight="duotone" />
        })
      })
    }

    if (state.success) {
      toast.success('Compra Exitosa', {
        description: successMsg,
        duration: 3000,
        icon: <SealCheckIcon size={24} weight="duotone" />
      })

      clearCart()
    }

  }, [state, clearCart])

  return (
    <form 
      action={dispacht}
    >
      <input 
        type="submit"
        className="w-full mt-5 bg-gray-700 text-white shadow hover:bg-gray-700/80 py-2 rounded-md transition-colors cursor-pointer"
        value="Confirmar Compra"
      />
    </form>
  )
}