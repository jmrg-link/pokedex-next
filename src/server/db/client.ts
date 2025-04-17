/**
 * Instancia única (singleton) de Prisma extendida con utilidades de caché
 * basadas en Redis.
 *
 * Se reutiliza durante los recargados en caliente (hot‑reload) en desarrollo
 * para evitar agotar las conexiones a la base de datos.
 *
 * @module prisma
 * @see prismaExtensionRedis — incorpora métodos como `prisma.getPokemonCached()`, etc.
 */


import { PrismaClient } from "@prisma/client";
import { prismaExtensionRedis } from "./prismaExtension";

const basePrisma = new PrismaClient();
const prismaExtended = basePrisma.$extends(prismaExtensionRedis);

export const prisma = prismaExtended;

type PrismaExtended = typeof prismaExtended;

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaExtended | undefined;
}

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
