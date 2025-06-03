"use client"

import FilterForm from "@/components/backoffice/sales/FilterForm";

export default function SalesPage() {
  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-900">Ventas</h2>
        <p className="text-lg">
          En esta sección puedes ver las ventas realizadas, utiliza el calendario para filtrar por fecha.
        </p>
      </div>

      <div>
        <FilterForm reservations={[]} onViewDetails={() => {}}/>
      </div>
    </>
  )
}