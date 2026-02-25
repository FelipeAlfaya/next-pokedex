import useSWR from "swr";
import type { Pokemon } from "@/types/pokemon";
import {
  fetchPokemonList,
  fetchAndMapPokemon,
} from "@/lib/pokeapi";

async function fetcher(
  _key: string,
  limit: number,
  offset: number
): Promise<{ pokemons: Pokemon[]; totalCount: number }> {
  const list = await fetchPokemonList(limit, offset);
  const ids = list.results.map((r) => {
    const match = r.url.match(/\/pokemon\/(\d+)\//);
    return match ? Number(match[1]) : 0;
  });
  const pokemons = await Promise.all(ids.map((id) => fetchAndMapPokemon(id)));
  return { pokemons, totalCount: list.count };
}

export function usePokemonList(limit = 20, offset = 0) {
  const { data, error, isLoading } = useSWR(
    ["pokemon-list", limit, offset],
    ([, l, o]) => fetcher("pokemon-list", l, o)
  );

  return {
    pokemons: data?.pokemons ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error: error ?? null,
  };
}
