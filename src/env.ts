import { z } from "zod";

/**
 * Valida y expone las variables de entorno necesarias para la aplicación.
 *
 * @module src/env
 *
 * @constant {z.ZodObject} _env - Esquema Zod con la validación de las siguientes variables:
 * @property {string} DATABASE_URL - URL de conexión a PostgreSQL.
 * @property {string} REDIS_URL - URL de conexión a Redis.
 * @property {string} NEXTAUTH_SECRET - Secreto para NextAuth.js.
 * @property {string} NEXTAUTH_URL - URL base pública para NextAuth.js.
 * @property {"0"|"1"} CACHE_LOG_HITS - Indicador de logs de aciertos de caché.
 */
const _env = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  CACHE_LOG_HITS: z.union([z.literal("0"), z.literal("1")]),
});

/**
 * Variables de entorno validadas y tipadas.
 *
 * @type {z.infer<typeof _env>}
 */
export const env = _env.parse(process.env);