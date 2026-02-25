import useSWR from "swr";
import type { Pokemon } from "@/types/pokemon";
import { fetchRegion, fetchAndMapPokemon } from "@/lib/pokeapi";

const PER_PAGE = 20;

async function fetchPokedex(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch pokedex");
  return res.json();
}

async function fetcherIds(regionName: string): Promise<number[]> {
  const region = await fetchRegion(regionName);
  const pokedexes = region.pokedexes ?? [];
  const firstPokedex = pokedexes[0];
  if (!firstPokedex?.url) return [];

  const pokedex = await fetchPokedex(firstPokedex.url);
  const entries = pokedex.pokemon_entries ?? [];
  return entries
    .map((e: { pokemon_species: { url: string } }) => {
      const match = e.pokemon_species.url.match(/\/pokemon-species\/(\d+)\//);
      return match ? Number(match[1]) : 0;
    })
    .filter(Boolean);
}

async function fetcherPage(
  regionName: string,
  page: number
): Promise<{ pokemons: Pokemon[]; totalCount: number }> {
  const ids = await fetcherIds(regionName);
  const totalCount = ids.length;
  const offset = (page - 1) * PER_PAGE;
  const pageIds = ids.slice(offset, offset + PER_PAGE);
  const pokemons = await Promise.all(pageIds.map((id: number) => fetchAndMapPokemon(id)));
  return { pokemons, totalCount };
}

export function useRegionPokemon(regionName: string, page = 1) {
  const { data, error, isLoading } = useSWR(
    regionName && page > 0 ? ["pokemon-by-region", regionName, page] : null,
    () => fetcherPage(regionName, page)
  );

  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return {
    pokemons: data?.pokemons ?? [],
    totalCount,
    totalPages,
    perPage: PER_PAGE,
    isLoading,
    error: error ?? null,
  };
}
