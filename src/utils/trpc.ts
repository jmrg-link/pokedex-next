import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../server/trpc/root";

/**
 * Devuelve la URL base para las peticiones tRPC en cualquier entorno.
 *
 * - En el navegador (cliente): rutas relativas ("").
 * - En producción: usa NEXT_PUBLIC_BASE_URL
 * - En desarrollo SSR: por defecto http://localhost:<PORT> (3000 si no se define PORT).
 */
function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "";
  }
  // NEXT_PUBLIC_BASE_URL se expone al cliente y al servidor
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * Configura el cliente tRPC para Next.js:
 * - Serialización/deserialización con SuperJSON.
 * - Batching de peticiones HTTP vía httpBatchLink.
 * - SSR deshabilitado (ssr: false).
 */
export const trpc = createTRPCNext<AppRouter>({
  transformer: superjson,
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
        }),
      ],
    };
  },
  ssr: false,
});
