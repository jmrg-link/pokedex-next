import { slugify } from "./slugify";

/**
 * Obtiene la URL de la sprite 'home' en modalidad normal para un Pokémon.
 *
 * @param {string} name - Nombre del Pokémon.
 * @returns {string} URL de la imagen en pokemondb.net.
 */
export function spriteUrl(name: string): string {
  return `https://img.pokemondb.net/sprites/home/normal/${slugify(name)}.png`;
}