import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  totalCount?: number;
}

const navItems = [
  { href: "/", label: "Pokémon" },
  { href: "/types", label: "Types" },
  { href: "/regions", label: "Regions" },
];

export default function Header({ totalCount }: HeaderProps) {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-dex-dark/70 border-b border-white/[0.06] px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/pokeball.png"
              alt="Poké Ball"
              width={28}
              height={28}
              className="object-contain drop-shadow-[0_0_8px_rgba(255,62,62,0.3)]"
            />
          </motion.div>
          <h1 className="font-display font-bold text-lg tracking-wider uppercase text-white/90">
            Poké<span className="text-dex-red">Dex</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ChevronDown className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
