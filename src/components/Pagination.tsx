import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-1 pt-10 pb-16"
    >
      <NavButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        <ChevronsLeft size={16} />
      </NavButton>

      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </NavButton>

      <div className="flex items-center gap-1 mx-1">
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="w-9 text-center text-white/20 text-sm select-none">
              ...
            </span>
          ) : (
            <motion.button
              key={page}
              whileTap={{ scale: 0.92 }}
              onClick={() => onPageChange(page as number)}
              className={`w-9 h-9 rounded-lg text-sm font-mono transition-all duration-200 ${
                currentPage === page
                  ? "bg-dex-red text-white shadow-[0_0_12px_rgba(255,62,62,0.3)]"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.06]"
              }`}
            >
              {page}
            </motion.button>
          )
        )}
      </div>

      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </NavButton>

      <NavButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        <ChevronsRight size={16} />
      </NavButton>
    </motion.div>
  );
}

function NavButton({
  children,
  disabled,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      {...props}
    >
      {children}
    </button>
  );
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 2) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];

  return [1, "...", current - 1, current, current + 1, "...", total];
}
