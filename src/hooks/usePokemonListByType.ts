import useSWR from "swr";
import type { Pokemon } from "@/types/pokemon";
import { fetchType, fetchAndMapPokemon } from "@/lib/pokeapi";

const PER_PAGE = 20;

async function fetcherIds(typeName: string): Promise<number[]> {
  const typeData = await fetchType(typeName);
  const pokemonRefs = typeData.pokemon ?? [];
  return pokemonRefs
    .map((p: { pokemon: { url: string } }) => {
      const match = p.pokemon.url.match(/\/pokemon\/(\d+)\//);
      return match ? Number(match[1]) : 0;
    })
    .filter(Boolean);
}

async function fetcherPage(typeName: string, page: number): Promise<{ pokemons: Pokemon[]; totalCount: number }> {
  const ids = await fetcherIds(typeName);
  const totalCount = ids.length;
  const offset = (page - 1) * PER_PAGE;
  const pageIds = ids.slice(offset, offset + PER_PAGE);
  const pokemons = await Promise.all(pageIds.map((id: number) => fetchAndMapPokemon(id)));
  return { pokemons, totalCount };
}

export function usePokemonListByType(typeName: string, page = 1) {
  const { data, error, isLoading } = useSWR(
    typeName && page > 0 ? ["pokemon-by-type", typeName, page] : null,
    () => fetcherPage(typeName, page)
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
