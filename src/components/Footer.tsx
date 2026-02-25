import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-dex-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/pokeball.png"
              alt="PokéDex"
              width={20}
              height={20}
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <span className="font-display font-bold text-sm text-white/70 group-hover:text-white/90 transition-colors">
              Poké<span className="text-dex-red">Dex</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors"
            >
              Pokémon
            </Link>
            <Link
              href="/types"
              className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors"
            >
              Types
            </Link>
            <Link
              href="/regions"
              className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors"
            >
              Regions
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25">
            Data from{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-dex-red/80 transition-colors"
            >
              PokeAPI
            </a>
            . Pokémon © Nintendo / Game Freak.
          </p>
          <p className="text-[11px] text-white/25">Not affiliated with Nintendo.</p>
        </div>
      </div>
    </footer>
  );
}
