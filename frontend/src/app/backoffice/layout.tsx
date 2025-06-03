import { AdminNav } from "@/components/layout/AdminNav";
import { Footer } from "@/components/layout/Footer";
import MainNav from "@/components/layout/MainNav";
import { CashRegisterIcon, ShoppingBagIcon, TagIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr";
import { ReactNode } from "react";

const navItems: {label: string, link: string, icon: ReactNode}[] = [
  {label: "Productos", link: "/backoffice/products",icon: <ShoppingBagIcon size={24} weight="duotone"/>},
  {label: "Categorias", link: "/backoffice/categories", icon: <TagIcon size={24} weight="duotone" />},
  {label: "Usuarios", link: "/backoffice/users", icon: <UsersIcon size={24} weight="duotone" />},
  {label: "Ventas", link: "/backoffice/sales", icon: <CashRegisterIcon size={24} weight="duotone" />},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen flex flex-col">
      <MainNav />
      <div className="flex flex-1 overflow-hidden divide-x divide-gray-300">
        <aside className="pt-6 min-w-1/5 shadow-md bg-gray-100 flex flex-col">
          <h2 className="px-4 text-2xl font-bold text-gray-900">Panel de Administracíon</h2>
          <AdminNav navItems={navItems} />
          <Footer />
        </aside>
        <section className="flex-1 overflow-auto m-2 bg-gray-100 rounded-md">
          {children}
        </section>
      </div>
    </main>
  )
}
