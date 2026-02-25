'use client'

import { motion } from "motion/react";
import Link from "next/link";
import Header from "@/components/Header";
import { getTypeConfig } from "@/lib/typeColors";
import useSWR from "swr";
import {
  Flame, Droplets, Leaf, Zap, Brain, Snowflake,
  Sword, Bird, Skull, Bug, Ghost, Mountain,
  Gem, Shield, Star, Sparkles, CircleDot, Wind
} from "lucide-react";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  fire: Flame,
  water: Droplets,
  grass: Leaf,
  electric: Zap,
  psychic: Brain,
  ice: Snowflake,
  fighting: Sword,
  flying: Bird,
  poison: Skull,
  bug: Bug,
  ghost: Ghost,
  rock: Mountain,
  ground: Gem,
  steel: Shield,
  dragon: Star,
  dark: CircleDot,
  fairy: Sparkles,
  normal: Wind,
  stellar: Star,
};

export default function TypesPage() {
  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/type?limit=50",
    fetcher
  );

  const types = data?.results?.filter(
    (t: { name: string }) => !["unknown", "shadow"].includes(t.name)
  ) ?? [];

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
            Pokémon Types
          </h1>
          <p className="text-white/35 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Explore all {types.length} elemental types and discover their Pokémon
          </p>
        </motion.div>

        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <p className="text-sm text-red-300">Failed to load types</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-dex-screen border border-white/[0.06] animate-shimmer"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {types.map((t: { name: string }, i: number) => {
              const config = getTypeConfig(capitalize(t.name));
              const Icon = TYPE_ICONS[t.name] ?? CircleDot;
              return (
                <Link key={t.name} href={`/types/${t.name}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl cursor-pointer"
                  >
                    <div
                      className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                      style={{ background: `linear-gradient(135deg, ${config.hex}50, transparent)` }}
                    />

                    <div className="relative bg-dex-screen rounded-2xl border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-300 overflow-hidden h-36 flex flex-col items-center justify-center gap-3">
                      <div
                        className="absolute top-0 left-0 right-0 bottom-0 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 30%, ${config.hex}, transparent 70%)` }}
                      />

                      <Icon
                        className="absolute top-2 right-2 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                        style={{ color: config.hex }}
                        size={60}
                        strokeWidth={1}
                      />

                      <div
                        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${config.hex}20`, boxShadow: `0 0 20px ${config.hex}00`, }}
                      >
                        <Icon
                          size={22}
                          style={{ color: config.hex }}
                          className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]"
                        />
                      </div>

                      <span
                        className="relative z-10 font-display font-bold text-sm uppercase tracking-widest transition-colors duration-300"
                        style={{ color: `${config.hex}cc` }}
                      >
                        {capitalize(t.name)}
                      </span>
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
