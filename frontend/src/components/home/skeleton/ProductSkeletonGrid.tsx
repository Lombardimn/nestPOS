import ProductSkeletonCard from './ProductSkeletonCard';

export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <ProductSkeletonCard key={index} />
        ))}
      </div>
    </div>
  )
}
