import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/trpc/root";
import { createContext } from "../../../server/trpc/trpc";

/**
 * API handler de tRPC para Next.js.
 *
 * Expone todos los procedimientos definidos en `appRouter`,
 * utilizando `createContext` para inyectar contexto en cada llamada.
 *
 * @returns {import("next").NextApiHandler} Manejador de API para rutas tRPC.
 */
export default createNextApiHandler({
  router: appRouter,
  createContext,
});
