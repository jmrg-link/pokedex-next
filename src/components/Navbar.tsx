import Link from "next/link";
import { useRouter } from "next/router";
import { Home } from "lucide-react";
import React from "react";

/**
 * Barra de navegación principal de la aplicación.
 *
 * Muestra un enlace al inicio con un icono y el título.
 * En páginas de detalle de Pokémon, incluye un botón para volver al listado principal.
 *
 * @returns {JSX.Element} Encabezado de navegación con estilo sticky.
 * export default function Navbar(): React.ReactElement {
 */
export default function Navbar(): React.ReactElement {
  const { pathname } = useRouter();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-white/70 to-white/30 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-700">
          <Home className="h-6 w-6" />
          <span>Pokédex BinPar</span>
        </Link>

        {!isHomePage && (
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow outline-none hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            ← Volver al listado
          </Link>
        )}
      </nav>
    </header>
  );
}
