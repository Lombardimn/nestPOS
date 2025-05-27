/* eslint-disable @typescript-eslint/no-unused-vars */
import { CouponResponseSchema, CouponType, ProductType, ShoppingCartType } from "@/schemas";
import { devtools } from "zustand/middleware"
import { create } from "zustand";

interface Store {
  total: number
  subTotalAmount: number
  discount: number
  contents: ShoppingCartType
  coupon: CouponType
  addToCart: (product: ProductType) => void
  updateQuantity: (id: ProductType['id'], quantity: number) => void
  removeFromCart: (id: ProductType['id']) => void
  calculateTotal: () => void
  applyCoupon: (coupon: string) => Promise<void>
  applyDiscount: () => void
  clearCart: () => void
}

const initialState = {
  total: 0,
  subTotalAmount: 0,
  discount: 0,
  contents: [],
  coupon: {
    name: '',
    percentage: 0,
    message: ''
  }
}

export const useShoppingCartStore = create<Store>()(devtools((set, get) => ({
  ...initialState,
  addToCart: (product) => {
    const { id: productId, categoryId: _categoryId, ...data } = product
    let contents: ShoppingCartType = []

    /** Revisar duplicados */
    const duplicated = get().contents.findIndex(item => item.productId === productId)

    if (duplicated >= 0) {

      /** Verificar stock */
      if (get().contents[duplicated].quantity >= get().contents[duplicated].stock) {
        return
      }

      /** Actualizar cantidad */
      contents = get().contents.map(item => item.productId === productId 
        ? ({ ...item, quantity: item.quantity + 1 })
        : item
      )
    } else {
      contents = [
        ...get().contents,
        {
          ...data,
          productId,
          quantity: 1
        }

      ]
    }

    /** Agregar al carrito */
    set(() => ({
      contents
    }))

    /** Calcular total */
    get().calculateTotal()
  },

  updateQuantity: (id, quantity) => {
    const contents = get().contents.map(item => item.productId === id
      ? ({ ...item, quantity })
      : item
    )

    set(() => ({
      contents
    }))

    /** Calcular total */
    get().calculateTotal()
  },
  removeFromCart: (id) => {
    const contents = get().contents.filter(item => item.productId !== id)

    set(() => ({
      contents
    }))

    if (!get().contents.length) {
      get().clearCart()
    }

    /** Calcular total */
    get().calculateTotal()
  },
  calculateTotal: () => {
    const total = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0)

    set(() => ({
      total
    }))

    /** Aplicar descuento */
    if (get().coupon.percentage) {
      get().applyDiscount()
    }
  },
  applyCoupon: async (coupon) => {
    const req = await fetch(
      '/coupons/api',
      {
        method: 'POST',
        body: JSON.stringify({
          coupon_name: coupon
        })
      }
    )

    const json = await req.json()
    const res = CouponResponseSchema.parse(json)

    /** Actualizar el estado del carrito con el cupon */
    set(() => ({
      coupon: res
    }))

    /** Aplicar descuento */
    if (res.percentage) {
      get().applyDiscount()
    }
  },
  applyDiscount: () => {
    const subTotalAmount = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0)
    const discount = (get().coupon.percentage / 100) * subTotalAmount
    const total = subTotalAmount - discount

    set(() => ({
      discount,
      total,
      subTotalAmount
    }))
  },
  clearCart: () => {
    set(() => ({
      ...initialState
    }))
  }
})))