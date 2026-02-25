export interface PokeApiNamedResource {
  name: string;
  url: string;
}

export interface PokeApiPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokeApiPokemonStat {
  base_stat: number;
  effort: number;
  stat: PokeApiNamedResource;
}

export interface PokeApiPokemonType {
  slot: number;
  type: PokeApiNamedResource;
}

export interface PokeApiPokemonSprites {
  other?: {
    "official-artwork"?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokeApiPokemonAbility {
  ability: PokeApiNamedResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokeApiPokemonResponse {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  types: PokeApiPokemonType[];
  abilities?: PokeApiPokemonAbility[];
  sprites: PokeApiPokemonSprites;
  stats: PokeApiPokemonStat[];
}

export interface PokeApiFlavorTextEntry {
  flavor_text: string;
  language: PokeApiNamedResource;
  version?: PokeApiNamedResource;
}

export interface PokeApiPokemonSpeciesResponse {
  flavor_text_entries: PokeApiFlavorTextEntry[];
}
