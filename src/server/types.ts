/**
 * @interface Pokemon
 * @description Representa un Pokémon con todas sus propiedades según PokeAPI.
 * @property {number} id - Identificador único del Pokémon.
 * @property {string} name - Nombre del Pokémon.
 * @property {number} base_experience - Experiencia base otorgada al derrotar a este Pokémon.
 * @property {number} height - Altura en decímetros.
 * @property {number} weight - Peso en hectogramos.
 * @property {number} order - Orden para clasificación, casi orden nacional, agrupando familias.
 * @property {boolean} is_default - Indica si es la forma predeterminada.
 * @property {string} location_area_encounters - URL para obtener áreas de encuentro.
 * @property {Ability[]} abilities - Habilidades que puede tener.
 * @property {NamedAPIResource[]} forms - Formas alternativas del Pokémon.
 * @property {GameIndex[]} game_indices - Índices del juego en diferentes versiones.
 * @property {HeldItem[]} held_items - Objetos que puede llevar.
 * @property {Move[]} moves - Movimientos disponibles.
 * @property {NamedAPIResource} species - Especie a la que pertenece.
 * @property {Sprites} sprites - Conjunto de imágenes.
 * @property {Stat[]} stats - Estadísticas y valores de esfuerzo.
 * @property {Type[]} types - Tipos del Pokémon.
 * @property {PastType[]} past_types - Tipos en generaciones anteriores.
 * @property {PastAbility[]} past_abilities - Habilidades en generaciones anteriores.
 * @property {Cries} cries - URLs de los cries de audio.
 */
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  order: number;
  is_default: boolean;
  location_area_encounters: string;
  abilities: Ability[];
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  moves: Move[];
  species: NamedAPIResource;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
  past_abilities: PastAbility[];
  cries: Cries;
}

/**
 * @interface Ability
 * @description Habilidad que puede tener un Pokémon.
 * @property {NamedAPIResource} ability - Recurso con nombre y URL de la habilidad.
 * @property {boolean} is_hidden - Indica si es habilidad oculta.
 * @property {number} slot - Posición de la habilidad.
 */
export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

/**
 * @interface PastAbility
 * @description Habilidades asignadas en generaciones anteriores.
 * @property {Array<{ability: NamedAPIResource | null, is_hidden: boolean, slot: number}>} abilities - Lista de habilidades con detalles.
 * @property {NamedAPIResource} generation - Generación correspondiente.
 */
export interface PastAbility {
  abilities: {
    ability: NamedAPIResource | null;
    is_hidden: boolean;
    slot: number;
  }[];
  generation: NamedAPIResource;
}

/**
 * @interface GameIndex
 * @description Índice de un Pokémon en una versión de juego específica.
 * @property {number} game_index - Valor del índice en la versión.
 * @property {NamedAPIResource} version - Recurso de la versión.
 */
export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

/**
 * @interface HeldItem
 * @description Objeto que puede llevar un Pokémon.
 * @property {NamedAPIResource} item - Recurso del objeto.
 * @property {Array<{rarity: number, version: NamedAPIResource}>} version_details - Detalles por versión.
 */
export interface HeldItem {
  item: NamedAPIResource;
  version_details: {
    rarity: number;
    version: NamedAPIResource;
  }[];
}

/**
 * @interface Move
 * @description Movimiento que puede aprender un Pokémon.
 * @property {NamedAPIResource} move - Recurso del movimiento.
 * @property {VersionGroupDetail[]} version_group_details - Detalles por grupo de versión.
 */
export interface Move {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

/**
 * @interface VersionGroupDetail
 * @description Detalles de aprendizaje de un movimiento en un grupo de versiones.
 * @property {number} level_learned_at - Nivel al que aprende el movimiento.
 * @property {NamedAPIResource} move_learn_method - Método de aprendizaje.
 * @property {number | null} order - Orden en la lista, puede ser null.
 * @property {NamedAPIResource} version_group - Grupo de versión asociado.
 */
export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  order: number | null;
  version_group: NamedAPIResource;
}

/**
 * @interface PastType
 * @description Tipo asignado a un Pokémon en generaciones anteriores.
 * @property {NamedAPIResource} generation - Generación correspondiente.
 * @property {Type[]} types - Lista de tipos en esa generación.
 */
export interface PastType {
  generation: NamedAPIResource;
  types: Type[];
}

/**
 * @interface Type
 * @description Tipo de un Pokémon y su posición.
 * @property {number} slot - Posición del tipo.
 * @property {NamedAPIResource} type - Recurso del tipo.
 */
export interface Type {
  slot: number;
  type: NamedAPIResource;
}

/**
 * @interface Stat
 * @description Estadística y valor de esfuerzo de un Pokémon.
 * @property {number} base_stat - Valor base de la estadística.
 * @property {number} effort - Valor de esfuerzo otorgado.
 * @property {NamedAPIResource} stat - Recurso de la estadística.
 */
export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

/**
 * @interface NamedAPIResource
 * @description Recurso genérico con nombre y URL.
 * @property {string} name - Nombre del recurso.
 * @property {string} url - URL para consultar el recurso.
 */
export interface NamedAPIResource {
  name: string;
  url: string;
}

/**
 * @interface Sprites
 * @description Conjunto de imágenes (sprites) de un Pokémon.
 * @property {string | null} back_default - Sprite trasero por defecto.
 * @property {string | null} back_female - Sprite trasero femenino.
 * @property {string | null} back_shiny - Sprite trasero brillante.
 * @property {string | null} back_shiny_female - Sprite trasero brillante femenino.
 * @property {string | null} front_default - Sprite delantero por defecto.
 * @property {string | null} front_female - Sprite delantero femenino.
 * @property {string | null} front_shiny - Sprite delantero brillante.
 * @property {string | null} front_shiny_female - Sprite delantero brillante femenino.
 * @property {OtherSprites} other - Conjuntos adicionales de sprites.
 * @property {VersionSprites} versions - Sprites por generación y versión.
 */
export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: VersionSprites;
}

/**
 * @interface OtherSprites
 * @description Conjuntos adicionales de sprites (Dream World, Home, Official Artwork, Showdown).
 */
export interface OtherSprites {
  dream_world: {
    front_default: string | null;
    front_female: string | null;
  };
  home: {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  "official-artwork": {
    front_default: string | null;
    front_shiny: string | null;
  };
  showdown: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
}

/**
 * @interface VersionSprites
 * @description Sprites específicos por generación y versión.
 */
export interface VersionSprites {
  "generation-i": {
    "red-blue": GenerationISprites;
    yellow: GenerationISprites;
  };
  "generation-ii": {
    crystal: GenerationIISprites;
    gold: GenerationIISprites;
    silver: GenerationIISprites;
  };
  "generation-iii": {
    emerald: GenerationISprites;
    "firered-leafgreen": GenerationISprites;
    "ruby-sapphire": GenerationISprites;
  };
  "generation-iv": {
    "diamond-pearl": GenerationIVSprites;
    "heartgold-soulsilver": GenerationIVSprites;
    platinum: GenerationIVSprites;
  };
  "generation-v": {
    "black-white": GenerationVAnimatedSprites;
  };
  "generation-vi": {
    "omegaruby-alphasapphire": GenerationVISprites;
    "x-y": GenerationVISprites;
  };
  "generation-vii": {
    icons: GenerationVISprites;
    "ultra-sun-ultra-moon": GenerationVISprites;
  };
  "generation-viii": {
    icons: GenerationVISprites;
  };
}

/**
 * @interface GenerationISprites
 * @description Sprites de la generación I.
 */
interface GenerationISprites {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
}

/**
 * @interface GenerationIISprites
 * @description Sprites de la generación II.
 */
interface GenerationIISprites {
  back_default: string | null;
  back_shiny: string | null;
  back_shiny_transparent?: string | null;
  back_transparent?: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_shiny_transparent?: string | null;
  front_transparent?: string | null;
}

/**
 * @interface GenerationIVSprites
 * @description Sprites de la generación IV.
 */
interface GenerationIVSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

/**
 * @interface GenerationVAnimatedSprites
 * @description Sprites animados de la generación V.
 */
interface GenerationVAnimatedSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

/**
 * @interface GenerationVISprites
 * @description Sprites de la generación VI en adelante.
 */
interface GenerationVISprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

/**
 * @interface Cries
 * @description URLs de audio para los cries de un Pokémon.
 * @property {string} latest - URL de la versión más reciente.
 * @property {string} legacy - URL de la versión legada.
 */
export interface Cries {
  latest: string;
  legacy: string;
}

/**
 * @interface Description
 * @description Descripción localizada en un idioma.
 * @property {string} description - Texto descriptivo.
 * @property {NamedAPIResource} language - Recurso del idioma.
 */
export interface Description {
  description: string;
  language: NamedAPIResource;
}

/**
 * @interface Characteristic
 * @description Característica basada en el módulo 5 del IV más alto de un Pokémon.
 * @property {number} id - Identificador de la característica.
 * @property {number} gene_modulo - Resto de IV más alto dividido por 5.
 * @property {number[]} possible_values - Valores posibles que generan esta característica.
 * @property {NamedAPIResource} highest_stat - Estadística correspondiente.
 * @property {Description[]} descriptions - Descripciones localizadas.
 */
export interface Characteristic {
  id: number;
  gene_modulo: number;
  possible_values: number[];
  highest_stat: NamedAPIResource;
  descriptions: Description[];
}
