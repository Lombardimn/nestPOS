import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductSkeletonCard() {
  return (
    <div className="bg-gray-400/60 rounded-md shadow-md overflow-hidden">
      {/* Imagen */}
      <div className="relative h-80 w-full rounded-2xl">
        <Skeleton className="absolute inset-0 w-full h-full rounded-md bg-gray-400/60" />
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-3">
        {/* Nombre */}
        <Skeleton className="h-5 w-3/4 bg-gray-400/60" />

        {/* Stock y precio */}
        <div className="flex items-center space-x-2 mt-2">
          <Skeleton className="h-6 w-24 rounded-full bg-gray-400/60" />
          <Skeleton className="h-6 w-16 bg-gray-400/60" />
        </div>
      </div>
    </div>
  )
}
