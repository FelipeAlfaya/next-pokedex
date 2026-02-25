'use client'

import Header from "@/components/Header";
import PokemonDetail from "@/components/PokemonDetail";
import PokemonGrid from "@/components/PokemonGrid";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import { usePokemonList } from "@/hooks/usePokemonList";
import type { Pokemon } from "@/types/pokemon";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";

const PER_PAGE = 20;

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * PER_PAGE;
  const { pokemons, totalCount, isLoading, error } = usePokemonList(PER_PAGE, offset);
  const totalPages = useMemo(() => Math.ceil(totalCount / PER_PAGE), [totalCount]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header totalCount={totalCount} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex mb-4"
          >
            <Image
              src="/pokeball.png"
              alt=""
              width={96}
              height={96}
              className="object-contain drop-shadow-[0_0_16px_rgba(255,62,62,0.4)]"
            />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white/70 mb-3">
            Discover Every{" "}
            <span className="bg-clip-text text-white/90">
              Poké<span className="text-dex-red">mon</span>
            </span>
          </h1>
        </motion.div>

        <SearchBar
          onResult={(pokemon, error) => {
            setSearchError(error ?? null);
            if (pokemon) setSelectedPokemon(pokemon);
          }}
        />

        {searchError && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-red-400 mb-4"
          >
            {searchError}
          </motion.p>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 rounded-full bg-dex-red" />
            <span className="text-sm font-display text-white/60">
              {isLoading ? "Loading..." : `${totalCount.toLocaleString()} species`}
            </span>
          </div>
          {totalPages > 1 && (
            <span className="text-xs font-mono text-white/25">
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>

        <PokemonGrid
          pokemons={pokemons}
          isLoading={isLoading}
          error={error}
          onSelect={setSelectedPokemon}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <AnimatePresence>
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
