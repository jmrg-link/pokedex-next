// src/components/PokemonCard.tsx

import React from "react";
import Link from "next/link";
import { slugify } from "../utils/slugify";

export interface PokemonCardProps {
  /**
   * Datos del Pokémon a mostrar:
   * - id: Identificador único.
   * - name: Nombre para mostrar.
   * - types: Tipos del Pokémon.
   * - generation: Generación a la que pertenece.
   * - image: URL de la imagen (opcional).
   * - evolutions: Evoluciones con nombre e id (opcional).
   */
  pokemon: {
    id: number;
    name: string;
    types: string[];
    generation: number;
    image?: string;
    evolutions?: { name: string; id: number }[];
  };
}

/**
 * Tarjeta de Pokémon con estilo dinámico según su tipo principal.
 *
 * @param props.pokemon Datos del Pokémon.
 * @returns {React.ReactElement}
 */
export const PokemonCard = ({ pokemon }: PokemonCardProps): React.ReactElement => {
  const primaryType = pokemon.types[0] ?? "normal";

  return (
    <div
      className={`group relative flex h-full w-full flex-col items-center justify-between rounded-2xl border-2 bg-white p-5 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-2xl ${typeBorder(primaryType)} `}
      style={{
        background:
          "radial-gradient(circle at 70% 30%, rgba(59,130,246,0.07) 0%, rgba(255,255,255,0.9) 100%)",
      }}
    >
      <div
        className={`pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-30 blur-2xl ${typeBg(primaryType)}`}
      />
      <div className="z-10 flex w-full flex-col items-center">
        {pokemon.image && (
          <div
            className={`mb-2 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 bg-white shadow-lg transition-transform duration-200 group-hover:scale-110 ${typeRing(primaryType)} `}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              loading="lazy"
              className="h-20 w-20 object-contain drop-shadow"
            />
          </div>
        )}

        <h2 className="mb-1 text-center text-xl font-extrabold tracking-tight text-gray-800 capitalize">
          {pokemon.name}
        </h2>

        <ul className="mb-2 flex flex-wrap justify-center gap-2">
          {pokemon.types.map((t) => (
            <li
              key={t}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold shadow-md ring-2 ring-white/60 ${typeColor(t)} `}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-white/70" />
              {t}
            </li>
          ))}
        </ul>

        <span className="mb-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 shadow">
          Gen {pokemon.generation}
        </span>

        {pokemon.evolutions && pokemon.evolutions.length > 0 && (
          <ul className="mb-2 w-full list-inside list-disc rounded bg-blue-50/40 px-2 py-1 text-xs text-blue-900 shadow-inner">
            {pokemon.evolutions.map((e) => (
              <li key={e.id} className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                {e.name}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/pokemon/${slugify(pokemon.name)}`}
          className="mt-2 inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

/** Clases de fondo difuminado según tipo. */
function typeBg(type: string): string {
  const map: Record<string, string> = {
    fire: "bg-red-200",
    water: "bg-blue-200",
    grass: "bg-green-200",
    electric: "bg-yellow-100",
    ice: "bg-cyan-100",
    fighting: "bg-orange-200",
    poison: "bg-purple-200",
    ground: "bg-yellow-300",
    flying: "bg-indigo-100",
    psychic: "bg-pink-200",
    bug: "bg-lime-200",
    rock: "bg-yellow-400",
    ghost: "bg-indigo-300",
    dragon: "bg-indigo-200",
    dark: "bg-gray-300",
    steel: "bg-gray-200",
    fairy: "bg-pink-100",
    normal: "bg-gray-100",
  };
  return (map[type] ?? map.normal) as string;
}

/** Clases de borde según tipo. */
function typeBorder(type: string): string {
  const map: Record<string, string> = {
    fire: "border-red-300",
    water: "border-blue-300",
    grass: "border-green-300",
    electric: "border-yellow-200",
    ice: "border-cyan-200",
    fighting: "border-orange-300",
    poison: "border-purple-300",
    ground: "border-yellow-400",
    flying: "border-indigo-200",
    psychic: "border-pink-300",
    bug: "border-lime-300",
    rock: "border-yellow-500",
    ghost: "border-indigo-400",
    dragon: "border-indigo-300",
    dark: "border-gray-400",
    steel: "border-gray-300",
    fairy: "border-pink-200",
    normal: "border-gray-200",
  };
  return (map[type] ?? map.normal) as string;
}

/** Clases de anillo según tipo. */
function typeRing(type: string): string {
  const map: Record<string, string> = {
    fire: "ring-2 ring-red-200",
    water: "ring-2 ring-blue-200",
    grass: "ring-2 ring-green-200",
    electric: "ring-2 ring-yellow-100",
    ice: "ring-2 ring-cyan-100",
    fighting: "ring-2 ring-orange-200",
    poison: "ring-2 ring-purple-200",
    ground: "ring-2 ring-yellow-300",
    flying: "ring-2 ring-indigo-100",
    psychic: "ring-2 ring-pink-200",
    bug: "ring-2 ring-lime-200",
    rock: "ring-2 ring-yellow-400",
    ghost: "ring-2 ring-indigo-300",
    dragon: "ring-2 ring-indigo-200",
    dark: "ring-2 ring-gray-300",
    steel: "ring-2 ring-gray-200",
    fairy: "ring-2 ring-pink-100",
    normal: "ring-2 ring-gray-100",
  };
  return (map[type] ?? map.normal) as string;
}

/** Clases de fondo para badges de tipo. */
function typeColor(type: string): string {
  const map: Record<string, string> = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400 text-gray-900",
    ice: "bg-cyan-400 text-gray-900",
    fighting: "bg-orange-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-300 text-gray-900",
    psychic: "bg-pink-500",
    bug: "bg-lime-600",
    rock: "bg-yellow-800",
    ghost: "bg-indigo-800",
    dragon: "bg-indigo-600",
    dark: "bg-gray-800",
    steel: "bg-gray-400 text-gray-900",
    fairy: "bg-pink-300 text-gray-900",
    normal: "bg-gray-300 text-gray-900",
  };
  return (map[type] ?? map.normal) as string;
}
