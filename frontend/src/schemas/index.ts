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

export const ShoppingCartContentsSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  stock: true
}).extend({
  productId: z.number(),
  quantity: z.number()
})

const OrderContentSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number()
})

export const OrderSchema = z.object({
  total: z.number(),
  coupon: z.string(),
  contents: z.array(OrderContentSchema).min(1, { message: 'El Carrito no puede ir vacio' })
})

/** Export response schemas */
export const CategoriesResponseSchema = z.array(CategorySchema)
export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)
export const CouponResponseSchema = z.object({
  name: z.string().default(''),
  message: z.string(),
  percentage: z.coerce.number().min(0).max(100).default(0),
})

/** Export all types */
export type ProductType = z.infer<typeof ProductSchema>
export type CategoryType = z.infer<typeof CategorySchema>
export type ShoppingCartType = z.infer<typeof ShoppingCartSchema>
export type CartItemType = z.infer<typeof ShoppingCartContentsSchema>
export type CouponType = z.infer<typeof CouponResponseSchema>
export type OrderType = z.infer<typeof OrderSchema>

/** Response API Schemas */
export const SuccessResponseSchema = z.object({
  message: z.string() 
})

export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number()
})