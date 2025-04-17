import type { NextPage } from "next";
import { useContext, useMemo } from "react";
import { trpc } from "../utils/trpc";
import { FilterContext, SearchContext } from "../contexts/main";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonFilter } from "../components/PokemonFilter";

/**
 * Página principal de listado de Pokémon.
 *
 * Carga datos por tRPC, aplica filtros y búsqueda desde contexto,
 * muestra un skeleton estilo MerakiUI durante la carga,
 * y despliega un grid responsivo con altura uniforme de tarjetas.
 *
 * @returns {JSX.Element}
 */
const HomePage: NextPage = () => {
  const { data: allPokemon, isLoading, isError } = trpc.pokemon.listAll.useQuery();
  const { filter } = useContext(FilterContext);
  const { query } = useContext(SearchContext);

  const filteredPokemon = useMemo(() => {
    if (!Array.isArray(allPokemon)) return [];
    const term = query.trim().toLowerCase();
    return allPokemon.filter((poke) => {
      if (filter.types.length && !poke.types.some((t) => filter.types.includes(t))) return false;
      if (filter.generations.length && !filter.generations.includes(poke.generation)) return false;
      if (term) {
        return (
          poke.name.toLowerCase().includes(term) ||
          poke.family.some((f) => f.toLowerCase().includes(term))
        );
      }
      return true;
    });
  }, [allPokemon, filter.types, filter.generations, query]);

  if (isLoading) {
    return (
      <main className="flex flex-col py-8">
        <section className="mx-auto max-w-5xl px-4">
          <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight text-blue-700">
            Listado de Pok<span className="text-yellow-500">é</span>mon
          </h1>
          <div className="mb-6 rounded-xl bg-white/80 p-4 shadow ring-1 ring-gray-100">
            <PokemonFilter allPokemon={[]} />
          </div>
          <ul className="grid auto-rows-fr grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <li key={idx} className="flex h-full w-full max-w-xs">
                <div
                  role="status"
                  className="group relative flex h-full w-full animate-pulse flex-col items-center rounded-2xl border-2 bg-white p-5 shadow"
                >
                  <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gray-200 opacity-30 blur-2xl" />
                  <div className="z-10 flex w-full flex-col items-center">
                    <div className="mb-2 h-24 w-24 rounded-full bg-gray-200" />
                    <div className="mb-4 h-6 w-32 rounded bg-gray-200" />
                    <div className="mb-4 flex gap-2">
                      <div className="h-4 w-16 rounded bg-gray-200" />
                      <div className="h-4 w-16 rounded bg-gray-200" />
                    </div>
                    <div className="mb-4 h-4 w-12 rounded bg-gray-200" />
                    <div className="h-8 w-24 rounded bg-gray-200" />
                  </div>
                  <span className="sr-only">Cargando tarjeta de Pokémon…</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  }

  if (isError) {
    return <p className="mt-8 text-center text-red-600">Error al cargar datos.</p>;
  }

  return (
    <main className="flex flex-col py-8">
      <section className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight text-blue-700">
          Listado de Pok<span className="text-yellow-500">é</span>mon
        </h1>
        <div className="mb-6 rounded-xl bg-white/80 p-4 shadow ring-1 ring-gray-100">
          <PokemonFilter allPokemon={allPokemon ?? []} />
        </div>
        <p className="mb-4 text-center text-sm text-gray-700">
          Mostrando <strong>{filteredPokemon.length}</strong> de {allPokemon?.length} Pokémon
        </p>
        <ul className="grid auto-rows-fr grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredPokemon.map((poke) => (
            <li key={poke.id} className="flex h-full w-full max-w-xs">
              <PokemonCard pokemon={poke} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
