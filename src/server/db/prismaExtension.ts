import { Prisma } from "@prisma/client"
import { createClient } from "redis"

/* ------------------------------------------------------------------ */
/*  Redis client (singleton)                                          */
/* ------------------------------------------------------------------ */

const redis = createClient({ url: process.env.REDIS_URL })
redis.connect().catch(err => console.error("❌ Redis:", err))

/* ------------------------------------------------------------------ */
/*  Cache helper                                                      */
/* ------------------------------------------------------------------ */

/**  
 * `CACHE_LOG_HITS=1` en `.env` → muestra cada *CACHE HIT* (verde).  
 * Omite o pon a `0` → sólo se loguean las descargas (*API FETCH*). */
const VERBOSE_HITS = process.env.CACHE_LOG_HITS === "1"

/**
 * Devuelve el valor almacenado en Redis o lo recupera de la fuente.
 *
 * @template T - Tipo de dato devuelto una vez parseado.
 * @param   key      Clave única en Redis.
 * @param   fetchFn  Función asíncrona que obtiene el dato fresco.
 * @returns Promesa con el dato (`T`) desde caché o recién obtenido.
 */
async function getOrSetCache<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  const cached = await redis.get(key)
  if (cached) {
    if (VERBOSE_HITS) console.log("🟢 CACHE HIT →", key)
    return JSON.parse(cached) as T
  }

  console.log("🔵 API FETCH →", key)
  const fresh = await fetchFn()
  await redis.set(key, JSON.stringify(fresh))
  return fresh
}

/* ------------------------------------------------------------------ */
/*  Prisma extension                                                  */
/* ------------------------------------------------------------------ */

/**
 * Añade a Prisma helpers cacheados para acceder a PokéAPI
 * (`getPokemonCached`, `getPokemonSpeciesCached`, `getEvolutionChainCached`).
 */
export const prismaExtensionRedis = Prisma.defineExtension(client =>
  client.$extends({
    name: "redis-cache",
    client: {
      /** Obtiene `/pokemon/:id|name` usando Redis como capa de caché. */
      async getPokemonCached(identifier: string | number) {
        const id = typeof identifier === "string" ? identifier.toLowerCase() : identifier
        return getOrSetCache(`pokemon:${id}`, async () => {
          const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          if (!r.ok) throw new Error(`Pokémon no encontrado: ${id}`)
          return r.json()
        })
      },

      /** Obtiene `/pokemon-species/:id|name` usando Redis como capa de caché. */
      async getPokemonSpeciesCached(identifier: string | number) {
        const id = typeof identifier === "string" ? identifier.toLowerCase() : identifier
        return getOrSetCache(`pokemon-species:${id}`, async () => {
          const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          if (!r.ok) throw new Error(`Species no encontrada: ${id}`)
          return r.json()
        })
      },

      /** Obtiene `/evolution-chain/:chainId` usando Redis como capa de caché. */
      async getEvolutionChainCached(chainId: number) {
        return getOrSetCache(`evolution-chain:${chainId}`, async () => {
          const r = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${chainId}`)
          if (!r.ok) throw new Error(`Cadena evolutiva no encontrada: ${chainId}`)
          return r.json()
        })
      },
    },
  }),
)
