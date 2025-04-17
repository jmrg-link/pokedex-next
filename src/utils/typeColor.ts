/**
 * Retorna la clase de Tailwind CSS correspondiente a un tipo de Pokémon.
 *
 * @param {string} [type] - Tipo de Pokémon (por ejemplo, "fire", "water").
 * @returns {string} Clase Tailwind para el tipo indicado; si no se proporciona o no coincide,
 * devuelve "bg-gray-500" por defecto.
 */
export function typeColor(type?: string): string {
  switch (type?.toLowerCase()) {
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-400 text-gray-900";
    case "psychic":
      return "bg-purple-500";
    case "ice":
      return "bg-cyan-300 text-gray-900";
    case "dragon":
      return "bg-indigo-700";
    case "dark":
      return "bg-gray-700";
    case "fairy":
      return "bg-pink-300 text-gray-900";
    case "normal":
      return "bg-gray-400 text-gray-900";
    case "fighting":
      return "bg-orange-700";
    case "flying":
      return "bg-indigo-300 text-gray-900";
    case "poison":
      return "bg-purple-600";
    case "ground":
      return "bg-yellow-700";
    case "rock":
      return "bg-yellow-800";
    case "bug":
      return "bg-lime-600";
    case "ghost":
      return "bg-indigo-800";
    case "steel":
      return "bg-gray-500 text-gray-900";
    default:
      return "bg-gray-500";
  }
}
