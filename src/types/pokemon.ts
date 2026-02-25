export interface PokemonStats {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  spd: number;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  stats: PokemonStats;
  height: number;
  weight: number;
  abilities: string[];
}
