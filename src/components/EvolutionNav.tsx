import { Fragment } from "react";
import Link from "next/link";
import clsx from "clsx";
import { slugify } from "../utils/slugify";
import { typeColor } from "../utils/typeColor";

export interface EvolutionNavProps {
  evolutions: {
    name: string;
    image?: string;
    types?: string[];
  }[];
  /** Nombre actual del Pokémon para resaltar la evolución correspondiente */
  current: string;
}

/**
 * Barra de navegación de cadena evolutiva.
 *
 * Muestra la lista de evoluciones con enlaces, avatar circular,
 * y un punto de acento según el tipo principal.
 *
 * @param {EvolutionNavProps} props
 * @returns {JSX.Element} Elemento `<nav>` con la secuencia de evoluciones.
 */
export function EvolutionNav({ evolutions, current }: EvolutionNavProps): React.ReactElement {
  const isSelected = (name: string): boolean => slugify(name) === slugify(current);

  return (
    <nav aria-label="Evoluciones" className="w-full">
      <ul className="flex flex-wrap items-center justify-center gap-6">
        {evolutions.map((evo, idx) => (
          <Fragment key={evo.name}>
            <li className="flex flex-col items-center">
              <Link
                href={`/pokemon/${slugify(evo.name)}`}
                aria-current={isSelected(evo.name) ? "step" : undefined}
                className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <div
                  className={clsx(
                    "relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-offset-2 transition-transform duration-300 group-hover:scale-105",
                    isSelected(evo.name)
                      ? "ring-blue-400 ring-offset-gray-900"
                      : "ring-gray-300 ring-offset-gray-800"
                  )}
                >
                  {evo.image && (
                    <img src={evo.image} alt={evo.name} className="h-full w-full object-cover" />
                  )}
                  {evo.types && (
                    <span
                      className={clsx(
                        "absolute -right-1 -bottom-1 h-3 w-3 rounded-full ring-2 ring-gray-900",
                        typeColor(evo.types[0])
                      )}
                    />
                  )}
                </div>
                <span
                  className={clsx(
                    "mt-2 text-xs font-medium capitalize transition-colors",
                    isSelected(evo.name) ? "text-white" : "text-gray-300 group-hover:text-white"
                  )}
                >
                  {evo.name}
                </span>
              </Link>
            </li>
            {idx < evolutions.length - 1 && (
              <li className="hidden text-lg text-gray-500 sm:block">→</li>
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
}
