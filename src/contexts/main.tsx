import React, { createContext, ReactNode, useState } from "react";

/**
 * Estado de los filtros seleccionados: tipos y generaciones.
 * @interface FilterState
 * @property {string[]} types - Tipos seleccionados.
 * @property {number[]} generations - Generaciones seleccionadas.
 */
export interface FilterState {
  types: string[];
  generations: number[];
}

/**
 * Contexto para manejar filtros de Pokémon.
 * @interface FilterContextType
 * @property {FilterState} filter - Filtros actuales.
 * @property {(f: FilterState) => void} setFilter - Actualiza los filtros.
 */
export interface FilterContextType {
  filter: FilterState;
  setFilter: (f: FilterState) => void;
}

/**
 * Contexto React para filtros de Pokémon.
 */
export const FilterContext = createContext<FilterContextType>({
  filter: { types: [], generations: [] },
  setFilter: () => {},
});

/**
 * Proveedor de FilterContext.
 * @param {object} props
 * @param {ReactNode} props.children - Componentes que consumen el contexto.
 * @returns {JSX.Element}
 */
export function FilterProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [filter, setFilter] = useState<FilterState>({ types: [], generations: [] });

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
}

/**
 * Estado de la búsqueda: término de consulta.
 * @interface SearchContextType
 * @property {string} query - Término de búsqueda.
 * @property {(q: string) => void} setQuery - Actualiza la búsqueda.
 */
export interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
}

/**
 * Contexto React para la búsqueda de Pokémon.
 */
export const SearchContext = createContext<SearchContextType>({ query: "", setQuery: () => {} });

/**
 * Proveedor de SearchContext.
 * @param {object} props
 * @param {ReactNode} props.children - Componentes que consumen el contexto.
 * @returns {JSX.Element}
 */
export function SearchProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [query, setQuery] = useState<string>("");

  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
}
