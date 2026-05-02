import type { Color } from "chess.js";
import { Clock } from "./Clock";
import { useClockStore } from "../../store/clockSlice";

interface ClockBarProps {
  color: Color;
}

export function ClockBar({ color }: ClockBarProps) {
  const whiteMs = useClockStore((s) => s.whiteMs);
  const blackMs = useClockStore((s) => s.blackMs);
  const activeColor = useClockStore((s) => s.activeColor);

  const ms = color === "w" ? whiteMs : blackMs;
  const isActive = activeColor === color;

  return (
    <Clock
      ms={ms}
      isActive={isActive}
      isLow={isActive && ms < 30_000}
    />
  );
}
