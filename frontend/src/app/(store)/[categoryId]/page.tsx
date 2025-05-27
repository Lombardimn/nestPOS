import ProductGrid from "@/components/home/product/ProductGrid";
import { getProduct } from "@/services/product.service";

export default async function StorePage({params}: {params: Promise<{categoryId: string}>}) {
  const {categoryId} = await params
  
  const category = await getProduct(categoryId)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid products={category.products} />
    </div>
  );
}