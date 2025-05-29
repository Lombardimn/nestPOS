import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

/** Importar la fuente */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'NESTPOS',
  description: "Punto de venta NESTPOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} antialiased`}
      >
        {children}

        <Toaster
          position="top-right"
          duration={3000}
          richColors
        />
      </body>
    </html>
  );
}
