'use client'

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import Header from "@/components/Header";
import PokemonGrid from "@/components/PokemonGrid";
import PokemonDetail from "@/components/PokemonDetail";
import Pagination from "@/components/Pagination";
import { useRegionPokemon } from "@/hooks/useRegionPokemon";
import type { Pokemon } from "@/types/pokemon";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function RegionDetailPage() {
  const params = useParams();
  const regionName = String(params.name ?? "");
  const [currentPage, setCurrentPage] = useState(1);
  const { pokemons, totalCount, totalPages, isLoading, error } = useRegionPokemon(regionName, currentPage);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16">
        <Link
          href="/regions"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Regions
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {capitalize(regionName)}
          </h1>
          <p className="text-white/40 text-sm mt-1">
            {totalCount.toLocaleString()} Pokémon in this region
            {totalPages > 1 && (
              <span className="ml-2 text-white/25">
                · Page {currentPage} of {totalPages}
              </span>
            )}
          </p>
        </motion.div>

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
