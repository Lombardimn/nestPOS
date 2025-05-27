import { CategoriesResponseSchema } from "@/schemas"

export async function getCategory() {
  const url = `${process.env.API_URL}/categories`

  const req = await fetch(url)
  const json = await req.json()
  const res = CategoriesResponseSchema.parse(json)
  
  return res
}