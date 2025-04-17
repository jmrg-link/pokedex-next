// src/pages/pokemon/[name].tsx

import { useRouter } from "next/router";
import type { NextPage } from "next";
import clsx from "clsx";
import { trpc } from "../../utils/trpc";
import { spriteUrl } from "../../utils/spriteUrl";
import { typeColor } from "../../utils/typeColor";
import { EvolutionNav } from "../../components/EvolutionNav";
import { PokemonStats } from "../../components/PokemonStats";

/**
 * Página de detalle de un Pokémon individual.
 *
 * - Obtiene el nombre desde la URL.
 * - Carga datos mediante tRPC (`getByName`).
 * - Muestra spinner durante la carga.
 * - Gestiona estado de error con botón de retorno.
 * - Despliega imagen, descripción, tipos, stats y evoluciones.
 *
 * @returns {JSX.Element}
 */
const PokemonDetailPage: NextPage = () => {
  const router = useRouter();
  const name = typeof router.query.name === "string" ? router.query.name : "";

  const {
    data: pokemon,
    isLoading,
    isError,
  } = trpc.pokemon.getByName.useQuery(name, { enabled: !!name });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-sky-100 via-white to-amber-100 p-4">
        <span className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600" />
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-amber-100 p-4">
        <p className="text-red-600">Error cargando Pokémon…</p>
        <button
          onClick={() => router.back()}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-xs text-white shadow"
        >
          Volver
        </button>
      </div>
    );
  }

  /**
   * Construye la lista de evoluciones con su imagen y tipos opcionales.
   * Para la forma actual, reutiliza la imagen y tipos cargados.
   */
  const evolutionsWithImages = pokemon.evolutions.map(({ name: evoName, id }) => {
    const isCurrent = evoName === pokemon.name;
    return {
      name: evoName,
      id,
      image: isCurrent ? pokemon.image! : spriteUrl(evoName),
      types: isCurrent ? pokemon.types : undefined,
    };
  });

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-sky-100 via-white to-amber-100 p-4">
      <article className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-gray-900/90 shadow-2xl ring-1 ring-white/10 backdrop-blur md:flex-row">
        <div
          className={clsx(
            "relative flex flex-1 items-center justify-center bg-gradient-to-tr p-6",
            gradientForType(pokemon.types[0] ?? "")
          )}
          style={{ clipPath: "polygon(0 0,100% 0,100% 100%,0 88%)" }}
        >
          {pokemon.image && (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="z-10 w-64 max-w-full drop-shadow-xl md:w-80"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6 p-8 text-white md:p-10">
          <header>
            <span className="font-mono text-sm text-teal-300">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight">{pokemon.name.toUpperCase()}</h1>
            <p className="mt-2 max-w-md text-sm text-gray-300">
              {pokemon.description || "Conoce a este Pokémon y sus estadísticas base."}
            </p>
          </header>

          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((t) => (
              <span
                key={t}
                className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold uppercase ${typeColor(
                  t
                )}`}
              >
                {t}
              </span>
            ))}
          </div>

          <PokemonStats stats={pokemon.stats} />

          {pokemon.evolutions.length > 1 && (
            <section>
              <h2 className="mb-3 text-sm font-bold tracking-wide text-gray-100">Evoluciones</h2>
              <EvolutionNav evolutions={evolutionsWithImages} current={pokemon.name} />
            </section>
          )}
        </div>
      </article>
    </div>
  );
};

export default PokemonDetailPage;

/**
 * Genera clases de gradiente Tailwind según el tipo principal.
 *
 * @param {string} type Tipo principal.
 * @returns {string} Clases para `bg-gradient-to-tr`.
 */
function gradientForType(type: string): string {
  switch (type.toLowerCase()) {
    case "fire":
      return "from-orange-500 to-red-600";
    case "water":
      return "from-sky-500 to-cyan-600";
    case "grass":
      return "from-emerald-500 to-lime-600";
    case "electric":
      return "from-yellow-400 to-amber-500";
    case "psychic":
      return "from-fuchsia-500 to-purple-700";
    case "ice":
      return "from-cyan-300 to-blue-400";
    case "dragon":
      return "from-indigo-500 to-purple-700";
    case "dark":
      return "from-gray-700 to-gray-900";
    case "fairy":
      return "from-pink-400 to-rose-500";
    default:
      return "from-emerald-400 to-teal-500";
  }
}
