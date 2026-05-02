import { create } from "zustand";
import { Chess } from "chess.js";
import type { Move, Color } from "chess.js";
import { checkGameOver } from "../lib/gameResult";
import { useClockStore } from "./clockSlice";
import type { GameResult } from "../types/chess";
import type { GameSettings } from "../types/game";

type GameStatus = "playing" | "over";

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
  resign: (color: Color) => void;
  timeOut: (color: Color) => void;
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
    const { chess, gameStatus, settings } = get();
    if (gameStatus !== "playing") return false;

    const movedColor = chess.turn();

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

    // Advance or stop the clock
    const clock = useClockStore.getState();
    if (result) {
      clock.stop();
    } else if (settings.timeControl) {
      clock.afterMove(movedColor);
    }

    return true;
  },

  resign: (color) => {
    if (get().gameStatus !== "playing") return;
    useClockStore.getState().stop();
    set({
      gameStatus: "over",
      result: { winner: color === "w" ? "b" : "w", reason: "resignation" },
    });
  },

  timeOut: (color) => {
    if (get().gameStatus !== "playing") return;
    set({
      gameStatus: "over",
      result: { winner: color === "w" ? "b" : "w", reason: "timeout" },
    });
  },
}));
