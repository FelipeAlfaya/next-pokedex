'use client'

import { motion } from "motion/react";
import Link from "next/link";
import Header from "@/components/Header";
import { MapPin } from "lucide-react";
import useSWR from "swr";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const REGION_META: Record<string, { color: string; gen: string; games: string }> = {
  kanto:   { color: "#e74c3c", gen: "I",    games: "Red / Blue / Yellow" },
  johto:   { color: "#3498db", gen: "II",   games: "Gold / Silver / Crystal" },
  hoenn:   { color: "#2ecc71", gen: "III",  games: "Ruby / Sapphire / Emerald" },
  sinnoh:  { color: "#9b59b6", gen: "IV",   games: "Diamond / Pearl / Platinum" },
  unova:   { color: "#f39c12", gen: "V",    games: "Black / White" },
  kalos:   { color: "#1abc9c", gen: "VI",   games: "X / Y" },
  alola:   { color: "#e67e22", gen: "VII",  games: "Sun / Moon" },
  galar:   { color: "#6366f1", gen: "VIII", games: "Sword / Shield" },
  hisui:   { color: "#8b5cf6", gen: "VIII", games: "Legends: Arceus" },
  paldea:  { color: "#ec4899", gen: "IX",   games: "Scarlet / Violet" },
};

export default function RegionsPage() {
  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/region",
    fetcher
  );

  const regions = data?.results ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3">
            Pokémon Regions
          </h1>
        </motion.div>

        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <p className="text-sm text-red-300">Failed to load regions</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-dex-screen border border-white/[0.06] animate-shimmer"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regions.map((r: { name: string; url: string }, i: number) => {
              const meta = REGION_META[r.name] ?? { color: "#6366f1", gen: "?", games: "Unknown" };
              const { color, gen, games } = meta;
              return (
                <Link key={r.name} href={`/regions/${r.name}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl cursor-pointer"
                  >
                    <div
                      className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                      style={{ background: `linear-gradient(135deg, ${color}50, transparent)` }}
                    />

                    <div className="relative bg-dex-screen rounded-2xl border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-300 overflow-hidden p-6 h-44 flex flex-col justify-between">
                      <div
                        className="absolute top-0 left-0 right-0 bottom-0 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 80% 20%, ${color}, transparent 60%)` }}
                      />

                      <span
                        className="absolute top-4 right-5 font-display font-black text-6xl leading-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 select-none"
                        style={{ color }}
                      >
                        {gen}
                      </span>

                      <div className="relative z-10 flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <MapPin
                            size={22}
                            style={{ color }}
                            className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]"
                          />
                        </div>
                        <div>
                          <h2
                            className="font-display font-bold text-xl tracking-wide transition-colors duration-300"
                            style={{ color }}
                          >
                            {capitalize(r.name)}
                          </h2>
                          <span className="text-[11px] font-mono text-white/25">
                            Generation {gen}
                          </span>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between">
                        <p className="text-xs text-white/30 font-medium truncate max-w-[70%]">
                          {games}
                        </p>
                        <span
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-md transition-colors duration-300"
                          style={{
                            backgroundColor: `${color}15`,
                            color: `${color}99`,
                            border: `1px solid ${color}20`,
                          }}
                        >
                          View Pokédex
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
