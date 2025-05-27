"use client"

import { Button, ButtonProps } from "../ui/Button";
import { ProductType } from "@/schemas";
import { useShoppingCartStore } from "@/store/shoppingCart.store";

interface AddToCartButtonProps extends Omit<ButtonProps, 'onClick'> {
  product: ProductType
  onSuccess?: () => void
}

export const AddToCartButton =  ({ 
  children = "Agregar al Carrito", 
  product, 
  ...buttonProps 
}: AddToCartButtonProps) => {
  const addToCart = useShoppingCartStore((state) => state.addToCart)

  // const handleAddToCart = async () => {
  //   try {
  //     //addToCart();
  //     //onSuccess?.();
  //     // Lógica adicional como mostrar toast, etc.
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //   }
  // };

  return (
    <Button
      onClick={() => addToCart(product)}
      //disabled={isLoading}
      {...buttonProps}
    >
      {children}
      {/* {children} {cart.items > 0 && `(${cart.items})`} */}
    </Button>
  );
};