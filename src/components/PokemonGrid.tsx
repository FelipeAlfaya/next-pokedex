import { motion } from "motion/react";
import PokemonCard from "./PokemonCard";
import type { Pokemon } from "@/types/pokemon";
import { Loader2 } from "lucide-react";

interface PokemonGridProps {
  pokemons: Pokemon[];
  isLoading?: boolean;
  error?: Error | null;
  onSelect: (pokemon: Pokemon) => void;
}

function SkeletonCard({ i }: { i: number }) {
  return (
    <div
      className="rounded-2xl border border-white/[0.06] bg-dex-screen overflow-hidden"
      style={{ animationDelay: `${i * 100}ms` }}
    >
      <div className="pt-6 pb-2 flex justify-center">
        <div className="w-36 h-36 rounded-full animate-shimmer" />
      </div>
      <div className="px-5 pb-5 space-y-3">
        <div className="h-5 w-24 rounded animate-shimmer" />
        <div className="flex gap-1.5">
          <div className="h-5 w-14 rounded-md animate-shimmer" />
          <div className="h-5 w-16 rounded-md animate-shimmer" />
        </div>
        <div className="flex gap-3 pt-2">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="h-8 w-10 rounded animate-shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PokemonGrid({
  pokemons,
  isLoading = false,
  error = null,
  onSelect,
}: PokemonGridProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24"
      >
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <div>
            <p className="text-sm font-medium text-red-300">Failed to load Pokémon</p>
            <p className="text-xs mt-1 text-red-300/60">{error.message}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center gap-3 mb-8 text-white/30">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-mono">Loading Pokémon...</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} i={i} />
          ))}
        </div>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24 text-white/40"
      >
        <p className="text-lg font-display">No Pokémon found</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {pokemons.map((pokemon, index) => (
        <div key={pokemon.id} onClick={() => onSelect(pokemon)}>
          <PokemonCard pokemon={pokemon} index={index} />
        </div>
      ))}
    </div>
  );
}
