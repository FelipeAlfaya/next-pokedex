"use client";

import { motion } from "motion/react";
import { Search, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { fetchPokemonByNameOrId } from "@/lib/pokeapi";
import type { Pokemon } from "@/types/pokemon";

interface SearchBarProps {
  onResult: (pokemon: Pokemon | null, error?: string) => void;
}

export default function SearchBar({ onResult }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isSearching) return;

    setIsSearching(true);
    onResult(null);

    try {
      const pokemon = await fetchPokemonByNameOrId(trimmed);
      onResult(pokemon);
      setQuery("");
    } catch {
      onResult(null, "Pokémon not found");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto mb-8 group">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-dex-red/15 via-purple-500/10 to-dex-blue/15 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"
      />
      <div className="relative flex items-center bg-dex-screen/80 border border-white/[0.06] group-focus-within:border-white/[0.12] rounded-xl px-4 py-0.5 transition-all duration-300">
        {isSearching ? (
          <Loader2 className="w-4 h-4 text-dex-red shrink-0 animate-spin" />
        ) : (
          <Search className="w-4 h-4 text-white/25 group-focus-within:text-white/50 transition-colors shrink-0" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or number..."
          disabled={isSearching}
          className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/25 font-display tracking-wide h-11 ml-3 disabled:opacity-70"
        />
        <button
          type="submit"
          disabled={!query.trim() || isSearching}
          className="ml-2 px-4 py-2 rounded-lg bg-dex-red/20 text-dex-red text-sm font-semibold hover:bg-dex-red/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Search
        </button>
      </div>
    </form>
  );
}
