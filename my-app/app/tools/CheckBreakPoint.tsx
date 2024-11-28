import { useState, useEffect } from "react";

/**
 * Custom hook to determine if the screen width is larger than the specified threshold.
 * @param threshold - The minimum width (in pixels) to check against.
 * @returns A boolean indicating if the screen width is larger than the threshold.
 */
export const useIsLargerThan = (threshold: number): boolean => {
  const [isLarger, setIsLarger] = useState<boolean>(false);

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${threshold}px)`);

    const updateIsLarger = () => {
      setIsLarger(query.matches);
    };

    // Set initial state
    updateIsLarger();

    // Attach the event listener
    query.addEventListener("change", updateIsLarger);

    // Cleanup listener on unmount
    return () => query.removeEventListener("change", updateIsLarger);
  }, [threshold]);

  return isLarger;
};
