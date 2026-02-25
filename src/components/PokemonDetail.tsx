import { motion } from "motion/react";
import { X, Activity, Shield, Swords, Wind, Sparkles, Zap } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import type { Pokemon } from "@/types/pokemon";
import { getTypeConfig } from "@/lib/typeColors";
import { usePokemonSpecies } from "@/hooks/usePokemonSpecies";
import AbilityBadge from "./AbilityBadge";
import type { ReactNode } from "react";

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
  const primaryType = getTypeConfig(pokemon.types[0]);
  const { flavorText, isLoading } = usePokemonSpecies(pokemon.id);
  const heightM = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  const statsData = [
    { subject: "HP", A: pokemon.stats.hp, fullMark: 200 },
    { subject: "ATK", A: pokemon.stats.atk, fullMark: 200 },
    { subject: "DEF", A: pokemon.stats.def, fullMark: 200 },
    { subject: "SP.ATK", A: pokemon.stats.spAtk, fullMark: 200 },
    { subject: "SP.DEF", A: pokemon.stats.spDef, fullMark: 200 },
    { subject: "SPD", A: pokemon.stats.spd, fullMark: 200 },
  ];

  const statItems: { icon: ReactNode; label: string; value: number; color: string }[] = [
    { icon: <Activity size={16} />, label: "HP", value: pokemon.stats.hp, color: "#4ade80" },
    { icon: <Swords size={16} />, label: "ATK", value: pokemon.stats.atk, color: "#f87171" },
    { icon: <Shield size={16} />, label: "DEF", value: pokemon.stats.def, color: "#60a5fa" },
    { icon: <Sparkles size={16} />, label: "SP.ATK", value: pokemon.stats.spAtk, color: "#c084fc" },
    { icon: <Zap size={16} />, label: "SP.DEF", value: pokemon.stats.spDef, color: "#22d3ee" },
    { icon: <Wind size={16} />, label: "SPD", value: pokemon.stats.spd, color: "#fbbf24" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="w-full max-w-4xl rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        style={{ background: "#18181d" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative md:w-[45%] p-8 flex flex-col items-center justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{ background: `radial-gradient(circle at 50% 40%, ${primaryType.hex}, transparent 70%)` }}
          />

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-colors text-white/60 hover:text-white"
          >
            <X size={18} />
          </motion.button>

          <motion.div
            initial={{ scale: 0.6, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
            className="relative z-10"
          >
            <div
              className="absolute inset-0 blur-[60px] rounded-full scale-110 opacity-30"
              style={{ background: primaryType.hex }}
            />
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-56 h-56 md:w-64 md:h-64 object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 flex gap-2 relative z-10"
          >
            {pokemon.types.map((type) => {
              const tc = getTypeConfig(type);
              return (
                <span
                  key={type}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: `${tc.hex}20`, color: tc.hex, border: `1px solid ${tc.hex}30` }}
                >
                  {type}
                </span>
              );
            })}
          </motion.div>
        </div>

        <div className="relative z-20 md:w-[55%] p-6 md:p-8 flex flex-col overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <span className="font-mono text-sm tracking-widest" style={{ color: `${primaryType.hex}90` }}>
              #{String(pokemon.id).padStart(3, "0")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mt-1">
              {pokemon.name}
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs font-mono text-white/30">
                Height <span className="text-white/60 font-semibold">{heightM} m</span>
              </span>
              <span className="text-xs font-mono text-white/30">
                Weight <span className="text-white/60 font-semibold">{weightKg} kg</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 space-y-6"
          >
            {(flavorText || isLoading) && (
              <p className="text-white/55 text-sm leading-relaxed">
                {isLoading ? (
                  <span className="inline-block h-4 w-full max-w-md rounded animate-shimmer bg-white/10" />
                ) : (
                  flavorText
                )}
              </p>
            )}

            {pokemon.abilities.length > 0 && (
              <div>
                <h3 className="text-[10px] font-mono text-white/25 uppercase tracking-wider mb-2">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <AbilityBadge key={ability} ability={ability} />
                  ))}
                </div>
              </div>
            )}

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={statsData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "monospace" }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 200]} tick={false} axisLine={false} />
                  <Radar
                    name={pokemon.name}
                    dataKey="A"
                    stroke={primaryType.hex}
                    strokeWidth={2}
                    fill={primaryType.hex}
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {statItems.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-3 flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.05] transition-colors"
                >
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-[9px] text-white/30 uppercase font-mono">{stat.label}</div>
                    <div className="text-sm font-bold font-mono text-white/80">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
