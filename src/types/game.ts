export type GameMode = "hvh" | "hve" | "evh" | "eve";

export type TimeControl = {
  initialMs: number;
  incrementMs: number;
};

export type GameSettings = {
  mode: GameMode;
  timeControl: TimeControl | null;
};
