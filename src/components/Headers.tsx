import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Componente de cabecera global de la aplicación.
 *
 * - Muestra un enlace al inicio.
 * - Si la ruta actual es un detalle de Pokémon, muestra un botón para volver al listado.
 *
 * @returns {JSX.Element} Elemento `<header>` con navegación principal.
 */
export function Header(): React.JSX.Element {
  const router = useRouter();
  const isDetailPage = router.pathname.startsWith("/pokemon/");

  return (
    <header
      style={{ height: "var(--header-h)" }}
      className="\\ fixed inset-x-0 top-0 z-50 box-border border-b border-white/15 bg-gradient-to-b from-blue-50/80 via-white/80 to-amber-50/80 backdrop-blur"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="i-lucide-home h-5 w-5 text-gray-200" />
          <span className="text-blue-500">
            Pokédex <span className="text-yellow-400">Next</span>
          </span>
        </Link>

        {isDetailPage && (
          <button
            onClick={() => router.push("/")}
            className="\\ \\ \\ ml-auto inline-flex items-center gap-1 rounded-md bg-blue-600/90 px-3 py-1.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          >
            ← Volver al listado
          </button>
        )}
      </div>
    </header>
  );
}
