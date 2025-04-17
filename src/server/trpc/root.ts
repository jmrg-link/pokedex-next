import { router } from "./trpc"
import { pokemonRouter } from "./routers/pokemon"

/**
 * Enrutador raíz de la API tRPC.  
 * Agrupa los sub‑routers de cada dominio de negocio.
 *
 * @see pokemonRouter — Endpoints públicos de Pokémon
 */
export const appRouter = router({
  pokemon: pokemonRouter,
})

/** Tipo auxiliar para el cliente tRPC. */
export type AppRouter = typeof appRouter
