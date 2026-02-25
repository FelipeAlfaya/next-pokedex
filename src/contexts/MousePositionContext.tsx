"use client";

import { createContext, useContext, useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface MousePositionContextValue {
  ref: React.MutableRefObject<MousePosition>;
}

const MousePositionContext = createContext<MousePositionContextValue | null>(null);

const fallbackRef = { current: { x: 0, y: 0 } };

export function MousePositionProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      ref.current = { x, y };
    }

    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <MousePositionContext.Provider value={{ ref }}>
      {children}
    </MousePositionContext.Provider>
  );
}

export function useMousePositionRef() {
  const ctx = useContext(MousePositionContext);
  return ctx?.ref ?? fallbackRef;
}
