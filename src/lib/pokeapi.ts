import type { Pokemon } from "@/types/pokemon";
import type {
  PokeApiPokemonListResponse,
  PokeApiPokemonResponse,
  PokeApiPokemonSpeciesResponse,
} from "@/types/pokeapi";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  limit = 24,
  offset = 0
): Promise<PokeApiPokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error("Failed to fetch pokemon list");
  return res.json();
}

export async function fetchPokemon(id: number): Promise<PokeApiPokemonResponse> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${id}`);
  return res.json();
}

export async function fetchPokemonByNameOrId(
  nameOrId: string | number
): Promise<Pokemon> {
  const query = typeof nameOrId === "string"
    ? nameOrId.toLowerCase().trim().replace(/\s+/g, "-")
    : String(nameOrId);
  const res = await fetch(`${BASE_URL}/pokemon/${query}`);
  if (!res.ok) throw new Error("Pokémon not found");
  const response: PokeApiPokemonResponse = await res.json();
  return mapPokemonResponse(response);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getStatValue(
  stats: PokeApiPokemonResponse["stats"],
  statName: string
): number {
  const stat = stats.find((s) => s.stat.name === statName);
  return stat?.base_stat ?? 0;
}

export function mapPokemonResponse(response: PokeApiPokemonResponse): Pokemon {
  const image =
    response.sprites.other?.["official-artwork"]?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`;

  const types = response.types
    .sort((a, b) => a.slot - b.slot)
    .map((t) => capitalize(t.type.name));

  const stats = {
    hp: getStatValue(response.stats, "hp"),
    atk: getStatValue(response.stats, "attack"),
    def: getStatValue(response.stats, "defense"),
    spAtk: getStatValue(response.stats, "special-attack"),
    spDef: getStatValue(response.stats, "special-defense"),
    spd: getStatValue(response.stats, "speed"),
  };

  const abilities = (response.abilities ?? [])
    .sort((a: { slot: number }, b: { slot: number }) => a.slot - b.slot)
    .map((a: { ability: { name: string } }) => capitalize(a.ability.name));

  return {
    id: response.id,
    name: capitalize(response.name),
    types,
    image,
    stats,
    height: response.height ?? 0,
    weight: response.weight ?? 0,
    abilities,
  };
}

export async function fetchAndMapPokemon(id: number): Promise<Pokemon> {
  const response = await fetchPokemon(id);
  return mapPokemonResponse(response);
}

export async function fetchPokemonSpecies(
  id: number
): Promise<PokeApiPokemonSpeciesResponse> {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon species ${id}`);
  return res.json();
}

export function getFlavorTextEn(
  species: PokeApiPokemonSpeciesResponse
): string | null {
  const en = species.flavor_text_entries.find((e) => e.language.name === "en");
  if (!en) return null;
  return en.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ").trim();
}

export async function fetchTypeList() {
  const res = await fetch(`${BASE_URL}/type?limit=50`);
  if (!res.ok) throw new Error("Failed to fetch types");
  return res.json();
}

export async function fetchType(nameOrId: string | number) {
  const res = await fetch(`${BASE_URL}/type/${nameOrId}`);
  if (!res.ok) throw new Error(`Failed to fetch type ${nameOrId}`);
  return res.json();
}

export async function fetchRegionList() {
  const res = await fetch(`${BASE_URL}/region`);
  if (!res.ok) throw new Error("Failed to fetch regions");
  return res.json();
}

export async function fetchRegion(nameOrId: string | number) {
  const res = await fetch(`${BASE_URL}/region/${nameOrId}`);
  if (!res.ok) throw new Error(`Failed to fetch region ${nameOrId}`);
  return res.json();
}

export async function fetchAbilityEffect(abilityName: string): Promise<string | null> {
  const name = abilityName.toLowerCase().replace(/\s+/g, "-");
  const res = await fetch(`${BASE_URL}/ability/${name}`);
  if (!res.ok) return null;
  const data = await res.json();
  const en = data.effect_entries?.find((e: { language: { name: string } }) => e.language.name === "en");
  return en?.short_effect ?? en?.effect ?? null;
}
