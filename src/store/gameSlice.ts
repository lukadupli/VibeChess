import { create } from "zustand";
import { Chess } from "chess.js";
import type { Move } from "chess.js";
import { checkGameOver } from "../lib/gameResult";
import type { GameResult } from "../types/chess";
import type { GameSettings } from "../types/game";

type GameStatus = "idle" | "playing" | "over";

const DEFAULT_SETTINGS: GameSettings = {
  mode: "hvh",
  timeControl: null,
};

interface GameState {
  chess: Chess;
  fen: string;
  history: Move[];
  moveIndex: number;
  gameStatus: GameStatus;
  result: GameResult | null;
  settings: GameSettings;

  startGame: (settings?: GameSettings) => void;
  makeMove: (from: string, to: string, promotion?: string) => boolean;
  resign: (color: "w" | "b") => void;
}

const initialChess = new Chess();

export const useGameStore = create<GameState>((set, get) => ({
  chess: initialChess,
  fen: initialChess.fen(),
  history: [],
  moveIndex: -1,
  gameStatus: "playing",
  result: null,
  settings: DEFAULT_SETTINGS,

  startGame: (settings = DEFAULT_SETTINGS) => {
    const chess = new Chess();
    set({
      chess,
      fen: chess.fen(),
      history: [],
      moveIndex: -1,
      gameStatus: "playing",
      result: null,
      settings,
    });
  },

  makeMove: (from, to, promotion) => {
    const { chess, gameStatus } = get();
    if (gameStatus !== "playing") return false;

    try {
      chess.move({ from, to, ...(promotion && { promotion }) });
    } catch {
      return false;
    }

    const history = chess.history({ verbose: true });
    const result = checkGameOver(chess);

    set({
      fen: chess.fen(),
      history,
      moveIndex: history.length - 1,
      gameStatus: result ? "over" : "playing",
      result,
    });

    return true;
  },

  resign: (color) => {
    if (get().gameStatus !== "playing") return;
    set({
      gameStatus: "over",
      result: { winner: color === "w" ? "b" : "w", reason: "resignation" },
    });
  },
}));
