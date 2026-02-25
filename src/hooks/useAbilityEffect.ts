import useSWR from "swr";
import { fetchAbilityEffect } from "@/lib/pokeapi";

export function useAbilityEffect(abilityName: string, enabled: boolean) {
  const { data, error, isLoading } = useSWR(
    enabled && abilityName ? ["ability-effect", abilityName] : null,
    () => fetchAbilityEffect(abilityName),
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  return {
    effect: data ?? null,
    isLoading,
    error: error ?? null,
  };
}
