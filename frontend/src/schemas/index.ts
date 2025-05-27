import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(),
  stock: z.number(),
  categoryId: z.number()
})

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string()
})

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema)
});

/** Shopping cart */
export const ShoppingCartContentsSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  stock: true
}).extend({
  productId: z.number(),
  quantity: z.number()
})

/** Export all types */
export type ProductType = z.infer<typeof ProductSchema>
export type CategoryType = z.infer<typeof CategorySchema>
export type ShoppingCartType = z.infer<typeof ShoppingCartSchema>
export type CartItemType = z.infer<typeof ShoppingCartContentsSchema>

/** Export response schemas */
export const CategoriesResponseSchema = z.array(CategorySchema)
export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)
