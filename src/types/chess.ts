import type { Color } from "chess.js";

export type GameResult = {
  winner: Color | "draw";
  reason:
    | "checkmate"
    | "stalemate"
    | "threefold_repetition"
    | "insufficient_material"
    | "fifty_move"
    | "resignation"
    | "timeout";
};
