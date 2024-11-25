import { useState, useEffect } from "react";

type Breakpoints = {
  sm: string | null;
  md: string | null;
  lg: string | null;
  xl: string | null;
};

const breakpoints: Breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

type ScreenSize = keyof Breakpoints | null;

export const useBreakpoint = (): ScreenSize => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<ScreenSize>(null);

  useEffect(() => {
    const mediaQueries = Object.entries(breakpoints).map(([key, value]) => ({
      key: key as keyof Breakpoints,
      query: window.matchMedia(`(min-width: ${value})`),
    }));

    const updateBreakpoint = () => {
      for (const { key, query } of mediaQueries) {
        if (query.matches) {
          setCurrentBreakpoint(key);
        }
      }
    };

    // Attach listeners
    mediaQueries.forEach(({ query }) =>
      query.addEventListener("change", updateBreakpoint)
    );

    // Set initial breakpoint
    updateBreakpoint();

    // Cleanup listeners on unmount
    return () => {
      mediaQueries.forEach(({ query }) =>
        query.removeEventListener("change", updateBreakpoint)
      );
    };
  }, []);

  return currentBreakpoint;
};
