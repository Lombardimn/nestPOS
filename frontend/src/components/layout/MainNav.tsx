import Link from "next/link";
import Logo from "../ui/Logo";
import { getCategory } from "@/services/category.service";

export default async function MainNav() {
  const categories = await getCategory()
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between">
      <div className="flex justify-center">
        <Logo />
      </div>

      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
        {
          categories.map((category) => (
            <Link 
              key={category.id}
              href={`/${category.id}`}
              className="text-white hover:text-green-400 transition-colors text-lg font-semibold px-2"
            >
              {category.name}
            </Link>
          ))
        }
        <Link
          href={"/backoffice/products"}
          className="rounded-md bg-green-400 font-bold py-2 px-4 text-white hover:bg-green-600 transition-colors"
        >
          Backoffice
        </Link>
      </nav>
    </header>
  )
}