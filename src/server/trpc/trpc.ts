import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { prisma } from '../db/client'

/**
 * Contexto disponible en cada llamada a un procedimiento tRPC.
 *
 * @interface Context
 * @property {typeof prisma} prisma - Cliente Prisma para acceso a la base de datos.
 */
export interface Context {
  prisma: typeof prisma
}

/**
 * Crea el contexto para cada petición tRPC.
 *
 * @function
 * @returns {Context} Objeto de contexto con acceso a Prisma.
 */
export const createContext = (): Context => ({
  prisma,
})

/**
 * Instancia base de tRPC configurada con:
 * - SuperJSON como transformador de datos.
 * - Formateo de errores que devuelve la forma original.
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape }) => shape,
})

/**
 * Helper para definir routers tRPC.
 *
 * @constant {ReturnType<typeof t.router>} router
 */
export const router = t.router

/**
 * Procedimiento público sin reglas de autorización.
 *
 * @constant {ReturnType<typeof t.procedure>} publicProcedure
 */
export const publicProcedure = t.procedure
