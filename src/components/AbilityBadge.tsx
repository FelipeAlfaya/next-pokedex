"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useAbilityEffect } from "@/hooks/useAbilityEffect";

interface AbilityBadgeProps {
  ability: string;
}

export default function AbilityBadge({ ability }: AbilityBadgeProps) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipRect, setTooltipRect] = useState({ top: 0, left: 0 });
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { effect, isLoading } = useAbilityEffect(ability, isHovering);

  useLayoutEffect(() => {
    if (isHovering && badgeRef.current && showTooltip) {
      const rect = badgeRef.current.getBoundingClientRect();
      setTooltipRect({
        left: rect.left + rect.width / 2,
        top: rect.top,
      });
    }
  }, [isHovering, showTooltip]);

  useEffect(() => {
    if (isHovering) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      showTimeoutRef.current = setTimeout(() => setShowTooltip(true), 300);
    } else {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }
      hideTimeoutRef.current = setTimeout(() => setShowTooltip(false), 200);
    }
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isHovering]);

  const hasContent = effect || isLoading;

  const tooltipEl =
    showTooltip &&
    hasContent &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed z-[9999] px-3 py-2 rounded-lg shadow-xl min-w-56 max-w-sm text-left pointer-events-none select-none"
            role="tooltip"
            style={{
              left: tooltipRect.left,
              top: tooltipRect.top - 8,
              transform: "translate(-50%, -100%)",
              background: "#18181d",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">
              {ability}
            </div>
            {isLoading ? (
              <div className="h-3 w-32 rounded animate-shimmer bg-white/10" />
            ) : (
              <p className="text-xs text-white/70 leading-relaxed">{effect}</p>
            )}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent"
              style={{
                borderTopColor: "#18181d",
                filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.08))",
              }}
            />
          </div>,
          document.body
        )
      : null;

  return (
    <span
      ref={badgeRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span
        className="px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/[0.06] text-white/70 cursor-help transition-colors hover:bg-white/[0.08] hover:border-white/[0.1]"
        title={hasContent ? undefined : ability}
      >
        {ability}
      </span>
      {tooltipEl}
    </span>
  );
}
