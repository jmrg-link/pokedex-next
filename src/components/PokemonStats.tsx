import React from "react";

export interface PokemonStatsProps {
  /**
   * Estadísticas base del Pokémon, donde la clave es el nombre de la estadística
   * y el valor es el valor numérico correspondiente.
   */
  stats: Record<string, number>;
}

/**
 * Muestra las estadísticas base de un Pokémon en barras con gradientes.
 *
 * Cada barra se limita al 100% de ancho y aplica un degradado según el tipo de estadística.
 *
 * @param {PokemonStatsProps} props
 * @param {Record<string, number>} props.stats - Mapa de estadísticas.
 * @returns {JSX.Element} Sección con gráficas de estadísticas.
 */
export function PokemonStats({ stats }: PokemonStatsProps): React.ReactElement {
  const gradients: Record<string, string> = {
    hp: "from-green-500 to-green-700",
    attack: "from-red-500 to-red-700",
    defense: "from-blue-500 to-blue-700",
    "special-attack": "from-pink-500 to-pink-700",
    "special-defense": "from-purple-500 to-purple-700",
    speed: "from-yellow-500 to-yellow-600",
  };

  return (
    <section aria-labelledby="stats-heading" className="w-full">
      <h2 id="stats-heading" className="mb-4 text-base font-extrabold tracking-tight text-gray-100">
        Estadísticas base
      </h2>

      <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
        {Object.entries(stats).map(([stat, value]) => {
          const width = Math.min(value, 100);
          const gradient = gradients[stat] ?? "from-gray-400 to-gray-600";

          return (
            <div key={stat} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium text-gray-200">
                <span className="capitalize">{stat.replace("-", " ")}</span>
                <span>{value}</span>
              </div>

              <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700">
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
