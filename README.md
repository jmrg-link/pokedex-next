# 🐉 Pokédex Next

**Prueba Técnica Analista – BinPar**  
Una Pokédex interactiva construida con **Next.js**, **TypeScript** y el T3 Stack, que consume en tiempo real la PokéAPI v2. Cubre listados, filtros, búsqueda predictiva, detalle de cada Pokémon con evoluciones y estadísticas, optimizada con caching en memoria y Redis.

---

## 📋 Índice

- [🐉 Pokédex Next](#-pokédex-next)
  - [📋 Índice](#-índice)
  - [🎯 Objetivo de la prueba](#-objetivo-de-la-prueba)
  - [✅ Requisitos cumplidos](#-requisitos-cumplidos)
  - [🧱 Stack y arquitectura](#-stack-y-arquitectura)
  - [📸 Previsualizaciones](#-previsualizaciones)
  - [🛠 Cómo probarlo localmente](#-cómo-probarlo-localmente)
    - [Variables de entorno](#variables-de-entorno)
    - [Docker Compose](#docker-compose)
    - [Scripts npm](#scripts-npm)
  - [🔍 Detalles de implementación](#-detalles-de-implementación)
    - [1. Listado completo](#1-listado-completo)
    - [2. Filtros Tipo y Generación](#2-filtros-tipo-y-generación)
    - [3. Buscador en vivo](#3-buscador-en-vivo)
    - [4. Detalle por Pokémon](#4-detalle-por-pokémon)
    - [5. Persistencia de estado](#5-persistencia-de-estado)
    - [6. Caching y rendimiento](#6-caching-y-rendimiento)
  - [💡 Decisiones técnicas y trade‑offs](#-decisiones-técnicas-y-tradeoffs)
  - [🔮 Mejoras futuras](#-mejoras-futuras)
  - [📄 Licencia](#-licencia)

---

## 🎯 Objetivo de la prueba

Desarrollar una mini‑Pokédex que:

- Liste todos los Pokémon de la PokéAPI v2.
- Permita filtrar por tipo y generación.
- Incorpore un buscador que incluya coincidencias en evoluciones.
- Muestre página de detalle con imagen, stats y navegación evolutiva.
- Use TypeScript, Next.js, tRPC y Prisma; idealmente dentro del T3 Stack.

---

## ✅ Requisitos cumplidos

| Requisito                                                       | Implementación                                                          |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1. Listado de todos los Pokémon                                 | `/pages/index.tsx` usa `trpc.pokemon.listAll`                           |
| 2. Filtros por tipo y generación                                | `PokemonFilter` con dropdown multi‑select                               |
| 3. Buscador en tiempo real (incluye evoluciones)                | `SearchContext` + filtro en `useMemo`                                   |
| 4. Página de detalle: nombre, imagen, generación, tipos, stats… | `/pages/pokemon/[name].tsx`, componentes `EvolutionNav`, `PokemonStats` |
| 5. Navegación entre evoluciones con estado seleccionado marcado | `EvolutionNav` detecta `current` y aplica estilos                       |
| 6. Persistencia de filtros y búsqueda al navegar                | React Context mantiene estado mientras dura sesión                      |
| 7. Skeleton UI durante carga                                    | Patron MerakiUI `animate-pulse` dentro de `<li role="status">`          |
| 8. Caching en Redis y memoria                                   | Prisma‑Redis extension + cache in‑memory en `fetchAllPokemonData`       |

---

## 🧱 Stack y arquitectura

- **Next.js**
- **TypeScript**
- **tRPC (v11)** para RPC type‑safe
- **Prisma** + `prisma-extension-redis` para ORM y caching
- **Zod** para validación
- **SuperJSON** para serialización
- **Redis** para caché de PokeAPI
- **Tailwind CSS** + MerakiUI Skeleton para estilos
- **React Context** para filtros y búsqueda
- **Docker Compose** para Postgres, pgAdmin y Redis

---

## 📸 Previsualizaciones

<p align="center">
  <img src="documentation/images/iPad-Air-5-820x1180.png"   width="200" alt="Listado en iPad" />
  <img src="documentation/images/iPhone-14-Pro-393x852.png"  width="150" alt="Listado en iPhone 14 Pro (vertical)" />
  <img src="documentation/images/iPhone-14-Pro-393x1141.png" width="150" alt="Detalle en iPhone 14 Pro (vertical)" />
  <img src="documentation/images/Pixel-7-Pro-689x1040.png"   width="150" alt="Detalle en Pixel 7 Pro" />
</p>

---

## 🛠 Cómo probarlo localmente

### Variables de entorno

Copiar `.env.example` a `.env` y completar:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5440/pokemon_db"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="tu_secreto_aqui"
NEXTAUTH_URL="http://localhost:3000"
CACHE_LOG_HITS=1
```

### Docker Compose

Levantamos base de datos, pgAdmin y Redis:

```bash
docker-compose up -d
```

> pgAdmin disponible en `http://localhost:5050`  
> (usuario: `pgadmin@example.com`, pass: `admin123`)

`docker-compose.yml`:

```yaml
name: postgresql-prisma-pgadmin
services:
  postgres:
    image: postgres:15
    container_name: postgres-pokemon
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: pokemon_db
    volumes:
      - postgresql-prisma-data:/var/lib/postgresql/data
    ports:
      - "5440:5432"
    restart: unless-stopped

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin
    depends_on:
      - postgres
    environment:
      PGADMIN_DEFAULT_EMAIL: pgadmin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin123
      PGADMIN_SERVER_JSON_FILE: /pgadmin4/servers.json
      PGADMIN_CONFIG_SERVER_MODE: "True"
    volumes:
      - ./servers.json:/pgadmin4/servers.json
      - pgadmin-web-data:/var/lib/pgadmin
    ports:
      - "5050:80"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: redis-pokemon
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  postgresql-prisma-data:
  pgadmin-web-data:
  redis-data:
```

### Scripts npm

```jsonc
"scripts": {
  "dev": "next dev --turbo",
  "build": "next build",
  "start": "next start",
  "db:generate": "prisma migrate dev",
  "db:studio": "prisma studio",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "typecheck": "tsc --noEmit",
  "format:check": "prettier --check .",
  "format:write": "prettier --write ."
}
```

Instalación y ejecución:

```bash
npm install
npm run db:generate
npm run dev
```

---

## 🔍 Detalles de implementación

### 1. Listado completo

- `fetchAllPokemonData()` carga 1 010 registros desde PokeAPI.
- Cache en memoria tras primera llamada; luego log hits (via `CACHE_LOG_HITS`).

### 2. Filtros Tipo y Generación

- `PokemonFilter` extrae tipos y generaciones únicas.
- Dropdown con checkboxes; cierra al click externo.

### 3. Buscador en vivo

- `SearchContext` mantiene `query`.
- Filtrado en `useMemo` busca en `name` y `family`.

### 4. Detalle por Pokémon

- Página dinámica `/pokemon/[name]`.
- `fetchPokemonDetail()` reúne datos, stats y evoluciones.
- `EvolutionNav` muestra chain con imagen y distingue evolución activa.

### 5. Persistencia de estado

- Contextos de React retienen filtros/búsqueda al navegar.
- No persiste en recarga completa (simplificación deliberada).

### 6. Caching y rendimiento

- **Redis**: TTL configurable para PokeAPI responses.
- **In‑memory**: evita re‑fetch de 1 010 Pokémon en cada render de home.

---

## 💡 Decisiones técnicas y trade‑offs

- **tRPC** end‑to‑end type safe vs REST fetch puro.
- **Combinar Redis + cache in‑memory** para desarrollo rápido y staging/producción.
- **MerakiUI Skeleton** para experiencia de carga perceptiva.
- **React Context** adecuado para estado ligero vs soluciones externas.

---

## 🔮 Mejoras futuras

- Paginación / infinite scroll en home.
- SSR/ISR para SEO.
- Dark mode / theming con Tailwind.
- Favoritos con NextAuth y backend persistente.
- Pruebas unitarias y E2E (Jest, Testing Library, Playwright).

---

## 📄 Licencia

MIT © 2025  
Repositorio público: <https://github.com/jmrg-link/pokedex-next>

---
