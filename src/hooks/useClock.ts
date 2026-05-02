import { useEffect } from "react";
import { useClockStore } from "../store/clockSlice";
import { useGameStore } from "../store/gameSlice";

// Mount once at the App level. Runs a 100ms interval using wall-clock deltas
// (performance.now) to avoid accumulated drift from counting ticks.
export function useClock() {
  const isRunning = useClockStore((s) => s.isRunning);
  const deduct = useClockStore((s) => s.deduct);
  const timeOut = useGameStore((s) => s.timeOut);

  useEffect(() => {
    if (!isRunning) return;

    let lastTime = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const elapsed = now - lastTime;
      lastTime = now;

      const flagged = deduct(elapsed);
      if (flagged) timeOut(flagged);
    }, 100);

    return () => clearInterval(id);
  }, [isRunning]);
}
