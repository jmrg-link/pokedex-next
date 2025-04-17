import React, { useContext, useMemo, useState, useRef, useEffect } from "react";
import { FilterContext, SearchContext } from "../contexts/main";

export interface PokemonFilterProps {
  /** Listado completo de Pokémon con tipos y generación. */
  allPokemon: Array<{ types: string[]; generation: number }>;
}

/**
 * Componente de filtros avanzado para Pokémon.
 *
 * Proporciona:
 * - Entrada de búsqueda por nombre o familia.
 * - Selección múltiple de tipos.
 * - Selección múltiple de generaciones.
 *
 * @param {PokemonFilterProps} props - Props del componente.
 * @returns {JSX.Element} Elementos de filtro para la lista de Pokémon.
 */
export const PokemonFilter: React.FC<PokemonFilterProps> = ({ allPokemon }): React.ReactElement => {
  const { filter, setFilter } = useContext(FilterContext);
  const { query, setQuery } = useContext(SearchContext);

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    allPokemon.forEach((p) => p.types.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [allPokemon]);

  const generationOptions = useMemo(() => {
    const set = new Set<number>();
    allPokemon.forEach((p) => set.add(p.generation));
    return Array.from(set).sort((a, b) => a - b);
  }, [allPokemon]);

  const [openType, setOpenType] = useState(false);
  const [openGen, setOpenGen] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);
  const genRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setOpenType(false);
      }
      if (genRef.current && !genRef.current.contains(e.target as Node)) {
        setOpenGen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleType = (type: string) => {
    setFilter({
      ...filter,
      types: filter.types.includes(type)
        ? filter.types.filter((t) => t !== type)
        : [...filter.types, type],
    });
  };

  const toggleGeneration = (gen: number) => {
    setFilter({
      ...filter,
      generations: filter.generations.includes(gen)
        ? filter.generations.filter((g) => g !== gen)
        : [...filter.generations, gen],
    });
  };

  return (
    <div className="rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-gray-100">
      <div className="relative mb-4 w-full sm:w-80">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="peer w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-11 text-sm shadow transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <span className="pointer-events-none absolute top-2.5 left-4 text-gray-400 peer-focus:text-blue-500">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <div className="relative" ref={typeRef}>
          <button
            type="button"
            onClick={() => setOpenType((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            {filter.types.length > 0 ? `Tipos (${filter.types.length})` : "Selecciona tipos"}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openType && (
            <div className="absolute z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              {typeOptions.map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    checked={filter.types.includes(type)}
                    onChange={() => toggleType(type)}
                    className="accent-blue-600"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={genRef}>
          <button
            type="button"
            onClick={() => setOpenGen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            {filter.generations.length > 0
              ? `Generaciones (${filter.generations.length})`
              : "Selecciona generaciones"}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openGen && (
            <div className="absolute z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              {generationOptions.map((gen) => (
                <label
                  key={gen}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    checked={filter.generations.includes(gen)}
                    onChange={() => toggleGeneration(gen)}
                    className="accent-blue-600"
                  />
                  <span>Gen {gen}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
