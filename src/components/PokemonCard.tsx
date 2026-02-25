import { motion } from "motion/react";
import type { Pokemon } from "@/types/pokemon";
import { getTypeConfig } from "@/lib/typeColors";

export default function PokemonCard({ pokemon, index }: { pokemon: Pokemon; index: number }) {
  const primaryType = getTypeConfig(pokemon.types[0]);
  const heightM = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl cursor-pointer"
    >
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${primaryType.hex}40, transparent)` }}
      />

      <div className="relative bg-dex-screen rounded-2xl border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-40 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 70% 20%, ${primaryType.hex}, transparent 70%)` }}
        />

        <div className="absolute top-3 right-3 font-mono text-[11px] text-white/20 group-hover:text-white/35 transition-colors">
          #{String(pokemon.id).padStart(3, "0")}
        </div>

        <div className="relative pt-6 pb-2 flex justify-center">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className="absolute inset-0 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-75"
              style={{ background: primaryType.hex }}
            />
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-36 h-36 object-contain relative z-10 drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all duration-300"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="px-5 pb-5">
          <h3 className="font-display font-bold text-lg text-white tracking-wide mb-2">
            {pokemon.name}
          </h3>

          <div className="flex gap-1.5 mb-4">
            {pokemon.types.map((type) => {
              const tc = getTypeConfig(type);
              return (
                <span
                  key={type}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${tc.bg}/20 ${tc.text} border border-current/10`}
                  style={{ backgroundColor: `${tc.hex}18`, color: tc.hex, borderColor: `${tc.hex}25` }}
                >
                  {type}
                </span>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            {[
              { label: "HP", value: pokemon.stats.hp },
              { label: "ATK", value: pokemon.stats.atk },
              { label: "DEF", value: pokemon.stats.def },
              { label: "SPD", value: pokemon.stats.spd },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[9px] font-mono text-white/25 mb-0.5">{stat.label}</div>
                <div className="text-xs font-bold font-mono text-white/70">{stat.value}</div>
              </div>
            ))}
            <div className="text-center">
              <div className="text-[9px] font-mono text-white/25">HT</div>
              <div className="text-xs font-bold font-mono text-white/70">{heightM}m</div>
            </div>
            <div className="text-center">
              <div className="text-[9px] font-mono text-white/25">WT</div>
              <div className="text-xs font-bold font-mono text-white/70">{weightKg}kg</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
