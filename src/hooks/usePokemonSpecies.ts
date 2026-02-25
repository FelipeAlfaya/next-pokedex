import useSWR from "swr";
import { fetchPokemonSpecies, getFlavorTextEn } from "@/lib/pokeapi";

export function usePokemonSpecies(pokemonId: number | null) {
  const { data: flavorText, isLoading } = useSWR(
    pokemonId ? ["pokemon-species", pokemonId] : null,
    async () => {
      if (!pokemonId) return null;
      const species = await fetchPokemonSpecies(pokemonId);
      return getFlavorTextEn(species);
    }
  );

  return { flavorText: flavorText ?? null, isLoading };
}
