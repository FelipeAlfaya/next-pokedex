export const TYPE_CONFIG: Record<string, { bg: string; text: string; gradient: string; hex: string }> = {
  Fire:     { bg: "bg-[#F08030]",  text: "text-[#F08030]",  gradient: "from-[#F08030]/20 to-[#F08030]/5", hex: "#F08030" },
  Water:    { bg: "bg-[#6890F0]",  text: "text-[#6890F0]",  gradient: "from-[#6890F0]/20 to-[#6890F0]/5", hex: "#6890F0" },
  Grass:    { bg: "bg-[#78C850]",  text: "text-[#78C850]",  gradient: "from-[#78C850]/20 to-[#78C850]/5", hex: "#78C850" },
  Electric: { bg: "bg-[#F8D030]",  text: "text-[#F8D030]",  gradient: "from-[#F8D030]/20 to-[#F8D030]/5", hex: "#F8D030" },
  Psychic:  { bg: "bg-[#F85888]",  text: "text-[#F85888]",  gradient: "from-[#F85888]/20 to-[#F85888]/5", hex: "#F85888" },
  Ice:      { bg: "bg-[#98D8D8]",  text: "text-[#98D8D8]",  gradient: "from-[#98D8D8]/20 to-[#98D8D8]/5", hex: "#98D8D8" },
  Dragon:   { bg: "bg-[#7038F8]",  text: "text-[#7038F8]",  gradient: "from-[#7038F8]/20 to-[#7038F8]/5", hex: "#7038F8" },
  Dark:     { bg: "bg-[#705848]",  text: "text-[#A89070]",  gradient: "from-[#705848]/20 to-[#705848]/5", hex: "#705848" },
  Fairy:    { bg: "bg-[#EE99AC]",  text: "text-[#EE99AC]",  gradient: "from-[#EE99AC]/20 to-[#EE99AC]/5", hex: "#EE99AC" },
  Normal:   { bg: "bg-[#A8A878]",  text: "text-[#A8A878]",  gradient: "from-[#A8A878]/20 to-[#A8A878]/5", hex: "#A8A878" },
  Fighting: { bg: "bg-[#C03028]",  text: "text-[#C03028]",  gradient: "from-[#C03028]/20 to-[#C03028]/5", hex: "#C03028" },
  Flying:   { bg: "bg-[#A890F0]",  text: "text-[#A890F0]",  gradient: "from-[#A890F0]/20 to-[#A890F0]/5", hex: "#A890F0" },
  Poison:   { bg: "bg-[#A040A0]",  text: "text-[#A040A0]",  gradient: "from-[#A040A0]/20 to-[#A040A0]/5", hex: "#A040A0" },
  Ground:   { bg: "bg-[#E0C068]",  text: "text-[#E0C068]",  gradient: "from-[#E0C068]/20 to-[#E0C068]/5", hex: "#E0C068" },
  Rock:     { bg: "bg-[#B8A038]",  text: "text-[#B8A038]",  gradient: "from-[#B8A038]/20 to-[#B8A038]/5", hex: "#B8A038" },
  Bug:      { bg: "bg-[#A8B820]",  text: "text-[#A8B820]",  gradient: "from-[#A8B820]/20 to-[#A8B820]/5", hex: "#A8B820" },
  Ghost:    { bg: "bg-[#705898]",  text: "text-[#705898]",  gradient: "from-[#705898]/20 to-[#705898]/5", hex: "#705898" },
  Steel:    { bg: "bg-[#B8B8D0]",  text: "text-[#B8B8D0]",  gradient: "from-[#B8B8D0]/20 to-[#B8B8D0]/5", hex: "#B8B8D0" },
  Stellar:  { bg: "bg-[#FFD700]",  text: "text-[#FFD700]",  gradient: "from-[#FFD700]/20 to-[#FFD700]/5", hex: "#FFD700" },
  Unknown:  { bg: "bg-[#68A090]",  text: "text-[#68A090]",  gradient: "from-[#68A090]/20 to-[#68A090]/5", hex: "#68A090" },
};

const FALLBACK = { bg: "bg-gray-500", text: "text-gray-400", gradient: "from-gray-500/20 to-gray-500/5", hex: "#888888" };

export function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] ?? FALLBACK;
}
