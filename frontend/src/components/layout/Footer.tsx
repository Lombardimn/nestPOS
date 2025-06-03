import Link from "next/link"
export const Footer = () => {
  return (
    <footer className="h-10 w-full border-t border-gray-300 flex items-center justify-center">
      Made with ❤️ by
      <Link target="_blank" href="https://github.com/lombardimn" className="hover:underline ml-1">@lombardidev</Link>
    </footer>
  )
}