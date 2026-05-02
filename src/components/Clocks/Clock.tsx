import { formatTime } from "../../lib/timeControl";

interface ClockProps {
  ms: number;
  isActive: boolean;
  isLow: boolean;
}

export function Clock({ ms, isActive, isLow }: ClockProps) {
  return (
    <div
      className={[
        "clock",
        isActive ? "clock-active" : "",
        isLow ? "clock-low" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {formatTime(ms)}
    </div>
  );
}
