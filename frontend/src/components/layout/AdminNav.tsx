"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const AdminNav = ({navItems}: {navItems: {label: string, link: string, icon: ReactNode}[]}) => {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col flex-1 px-4 w-full">
      <ul className="flex flex-col space-y-1 mt-6">
        {navItems.map(({label, link, icon}, index) => (
          <li key={index} className="hover:bg-gray-200 hover:text-green-700 rounded-lg transition-colors">
            <Link
              href={link}
              className={
                classNames(pathname === link
                  ? "text-green-700 bg-gray-200"
                  : "text-gray-800 bg-transparent",
                  "flex gap-4 items-center p-2 rounded-lg transition-colors"
                )
              }
              
            >
              {icon}
              <span className="inline-block text-lg">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}