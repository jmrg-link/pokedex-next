import _slugify from "slugify";

/**
 * Genera un slug consistente a partir de una cadena.
 *
 * @param {string} str - Texto de entrada a convertir en slug.
 * @returns {string} Slug en minúsculas, sin caracteres especiales, adecuado para URLs.
 */
export function slugify(str: string): string {
  return _slugify(str, {
    lower: true,
    strict: true,
    locale: "es",
    trim: true,
  });
}