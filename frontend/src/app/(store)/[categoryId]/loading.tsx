import ProductGridSkeleton from "@/components/home/skeleton/ProductSkeletonGrid";

export default function Loading() {
  return (
    <div className="p-4">
      <ProductGridSkeleton count={8} />
    </div>
  )
}