import { Header } from "./Headers";
import type { PropsWithChildren, ReactElement } from "react";

/**
 * Componente de layout que envuelve cada página.
 *
 * - Incluye el encabezado fijo con CSS variable `--header-h`.
 * - Define un `<main>` de altura completa (`100dvh`), compensando el header
 *   mediante `paddingTop` para evitar scroll extra.
 * - Aplica un fondo degradado.
 *
 * @param {PropsWithChildren} props - Contiene los elementos hijos de la vista.
 * @param {React.ReactNode} props.children - Contenido específico de la página.
 * @returns {ReactElement} Estructura de layout con header y contenido.
 */
export default function Layout({ children }: PropsWithChildren): ReactElement {
  return (
    <>
      <Header />
      <main
        style={{ height: "100dvh", paddingTop: "var(--header-h)" }}
        className="flex flex-col bg-gradient-to-br from-blue-50 via-white to-amber-50"
      >
        {children}
      </main>
    </>
  );
}
