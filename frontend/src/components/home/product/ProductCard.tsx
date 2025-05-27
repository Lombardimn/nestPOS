import { ProductType } from "@/schemas";
import { formatCurrency } from "@/utils";
import Image from "next/image";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="bg-neutral-100 shadow-md rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-80 w-full rounded-2xl">
        <Image
          src={`${process.env.API_URL}/img/${product.image}`}
          alt={`Imagen de ${product.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-2xl"
          priority
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{product.name}</h3>
        <div className="mt-2 flex items-center">
          <div className="flex items-center space-x-2">
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Disponibles: {product.stock}
              </span>
            ) : (
              <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">
                Agotado
              </span>
            )}
            <p className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</p>
          </div>
        </div>

        <div>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  )
}