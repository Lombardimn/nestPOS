"use server"

import { ErrorResponseSchema, OrderSchema, OrderType, SuccessResponseSchema } from "@/schemas";
import { revalidateTag } from "next/cache";

export async function submitOrder(data: OrderType) {
  
  const order = OrderSchema.parse(data)
  
  /** Enviar la orden */
  const url = `${process.env.API_URL}/transactions`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })

  const res = await req.json()

  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(res)

    return {
      errors: errors.message.map((issue => issue)),
      success: ''
    }
  }

  const success = SuccessResponseSchema.parse(res)
  revalidateTag('products-by-category')
  
  return {
    errors: [],
    success
  }
}