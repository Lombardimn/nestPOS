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
  
  return (
    <Button
      onClick={() => addToCart(product)}
      //disabled={isLoading}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};