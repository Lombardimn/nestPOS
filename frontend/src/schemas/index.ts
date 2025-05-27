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

/** Export all types */
export type ProductType = z.infer<typeof ProductSchema>
export type CategoryType = z.infer<typeof CategorySchema>

/** Export response types */
export const CategoriesResponseSchema = z.array(CategorySchema)
