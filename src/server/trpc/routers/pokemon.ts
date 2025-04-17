import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { z } from "zod";
import { slugify } from "../../../utils/slugify";
import type { Pokemon, Characteristic } from "../../types";
import { TRPCError } from "@trpc/server";

/**
 * Valida un ID numérico positivo.
 */
const PokemonId = z.number().positive();

/**
 * Valida un ID numérico positivo para características.
 */
const CharacteristicId = z.number().positive();

/**
 * Mapeo de generaciones romanas a enteros.
 */
const ROMAN_GEN: Record<string, number> = {
  i: 1, ii: 2, iii: 3, iv: 4, v: 5,
  vi: 6, vii: 7, viii: 8, ix: 9,
};

/**
 * Representa una entrada simplificada para el catálogo de la home.
 */
type CatalogEntry = {
  id: number;
  name: string;
  description: string;
  types: string[];
  generation: number;
  family: string[];
  base_experience: number;
  height: number;
  weight: number;
  image?: string;
};

let homeCatalog: CatalogEntry[] | null = null;

/**
 * Extrae la descripción en español de una especie Pokémon.
 * @param species - Objeto de especie con flavor_text_entries.
 * @returns Texto limpio o mensaje por defecto.
 */
function getSpanishDescription(species: any): string {
  const entry = species.flavor_text_entries.find((e: any) => e.language.name === "es");
  return entry
    ? entry.flavor_text.replace(/\f/g, " ").replace(/\s+/g, " ").trim()
    : "Descripción no disponible.";
}

/**
 * Obtiene y cachea en memoria los primeros 1010 Pokémon para el catálogo de la home.
 * @returns Array de entradas simplificadas.
 */
async function fetchHomeCatalog(): Promise<CatalogEntry[]> {
  if (homeCatalog) return homeCatalog;

  const entries: CatalogEntry[] = [];
  const evoCache: Record<number, string[]> = {};
  for (let id = 1; id <= 1010; id++) {
    const [poke, species] = await Promise.all([
      prisma.getPokemonCached(id) as Promise<Pokemon>,
      prisma.getPokemonSpeciesCached(id),
    ]);

    const types = poke.types.map(t => t.type.name);
    const generation = ROMAN_GEN[species.generation.name.replace("generation-", "")] || 0;
    const chainId = Number(species.evolution_chain?.url.split("/").slice(-2)[0]);
    if (!evoCache[chainId]) {
      const chain = await prisma.getEvolutionChainCached(chainId);
      const names: string[] = [];
      let node = chain.chain;
      while (node) {
        names.push(node.species.name);
        node = node.evolves_to[0] ?? null;
      }
      evoCache[chainId] = names;
    }

    const image = poke.sprites.other?.["official-artwork"]?.front_default ?? poke.sprites.front_default;

    entries.push({
      id,
      name: poke.name,
      description: getSpanishDescription(species),
      types,
      generation,
      family: evoCache[chainId],
      base_experience: poke.base_experience,
      height: poke.height,
      weight: poke.weight,
      image: image ?? undefined,
    });
  }

  homeCatalog = entries.sort((a, b) => a.id - b.id);
  return homeCatalog;
}

/**
 * Obtiene detalles completos de un Pokémon por ID.
 * @param id - Identificador del Pokémon.
 * @returns Objeto con datos enriquecidos.
 * @throws TRPCError si no existe.
 */
async function fetchPokemonById(id: number) {
  const [poke, species] = await Promise.all([
    prisma.getPokemonCached(id) as Promise<Pokemon>,
    prisma.getPokemonSpeciesCached(id),
  ]);

  const generation = ROMAN_GEN[species.generation.name.replace("generation-", "")] || 0;
  const chainId = Number(species.evolution_chain?.url.split("/").slice(-2)[0]);
  const chain = await prisma.getEvolutionChainCached(chainId);
  const evolutions: { name: string; id: number }[] = [];
  let node = chain.chain;
  while (node) {
    evolutions.push({
      name: node.species.name,
      id: Number(node.species.url.split("/").slice(-2)[0]),
    });
    node = node.evolves_to[0] ?? null;
  }

  const stats: Record<string, number> = {};
  poke.stats.forEach(s => { stats[s.stat.name] = s.base_stat; });
  const image = poke.sprites.other?.["official-artwork"]?.front_default ?? poke.sprites.front_default;

  return {
    id,
    name: poke.name,
    description: getSpanishDescription(species),
    generation,
    types: poke.types.map(t => t.type.name),
    evolutions,
    stats,
    base_experience: poke.base_experience,
    height: poke.height,
    weight: poke.weight,
    image: image ?? undefined,
  };
}

/**
 * Recupera una característica por ID de PokeAPI.
 * @param id - Identificador de la característica.
 * @returns Objeto Characteristic.
 * @throws TRPCError si no existe.
 */
async function fetchCharacteristic(id: number): Promise<Characteristic> {
  const res = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}`);
  if (!res.ok) throw new TRPCError({ code: "NOT_FOUND", message: `Characteristic ${id} no encontrada` });
  return res.json() as Promise<Characteristic>;
}

export const pokemonRouter = router({
  listAll: publicProcedure.query(fetchHomeCatalog),
  getById: publicProcedure.input(PokemonId).query(({ input }) => fetchPokemonById(input)),
  getByName: publicProcedure.input(z.string()).query(async ({ input }) => {
    const slug = slugify(input.toLowerCase());
    const poke = (await prisma.getPokemonCached(slug)) as Pokemon | undefined;
    if (!poke) throw new TRPCError({ code: "NOT_FOUND", message: "Pokémon no encontrado" });
    return fetchPokemonById(poke.id);
  }),
  getCharacteristicById: publicProcedure.input(CharacteristicId).query(({ input }) => fetchCharacteristic(input)),
});