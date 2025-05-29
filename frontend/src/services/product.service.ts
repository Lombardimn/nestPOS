import { CategoryWithProductsResponseSchema } from "@/schemas"
import { redirect } from "next/navigation"

export async function getProduct(categoryId:string) {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`
  
  const req = await fetch(url, {
    next: {
      tags: ['products-by-category']
    }
  })
  const json = await req.json()

  /** validar la respuesta */
  if (!req.ok) {
    redirect('/1')
  }

  const res = CategoryWithProductsResponseSchema.parse(json)
  
  return res
}