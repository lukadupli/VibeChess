import type { TimeControl } from "../types/game";

export const TIME_CONTROL_PRESETS: { label: string; value: TimeControl }[] = [
  { label: "Bullet 1+0", value: { initialMs: 60_000, incrementMs: 0 } },
  { label: "Bullet 2+1", value: { initialMs: 120_000, incrementMs: 1_000 } },
  { label: "Blitz 3+2", value: { initialMs: 180_000, incrementMs: 2_000 } },
  { label: "Blitz 5+0", value: { initialMs: 300_000, incrementMs: 0 } },
  { label: "Rapid 10+0", value: { initialMs: 600_000, incrementMs: 0 } },
  { label: "Rapid 15+10", value: { initialMs: 900_000, incrementMs: 10_000 } },
  { label: "Classical 30+0", value: { initialMs: 1_800_000, incrementMs: 0 } },
];

export function formatTime(ms: number): string {
  if (ms <= 0) return "0:00";
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
