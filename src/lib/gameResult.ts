import type { Chess } from "chess.js";
import type { GameResult } from "../types/chess";

export function checkGameOver(chess: Chess): GameResult | null {
  if (chess.isCheckmate()) {
    return {
      winner: chess.turn() === "w" ? "b" : "w",
      reason: "checkmate",
    };
  }
  if (chess.isStalemate()) return { winner: "draw", reason: "stalemate" };
  if (chess.isThreefoldRepetition())
    return { winner: "draw", reason: "threefold_repetition" };
  if (chess.isInsufficientMaterial())
    return { winner: "draw", reason: "insufficient_material" };
  if (chess.isDrawByFiftyMoves()) return { winner: "draw", reason: "fifty_move" };
  return null;
}

export function resultLabel(result: GameResult): string {
  if (result.winner === "draw") {
    const reasons: Record<GameResult["reason"], string> = {
      stalemate: "Draw by stalemate",
      threefold_repetition: "Draw by repetition",
      insufficient_material: "Draw — insufficient material",
      fifty_move: "Draw by 50-move rule",
      checkmate: "",
      resignation: "",
      timeout: "",
    };
    return reasons[result.reason] || "Draw";
  }
  const winner = result.winner === "w" ? "White" : "Black";
  const reasons: Partial<Record<GameResult["reason"], string>> = {
    checkmate: `${winner} wins by checkmate`,
    resignation: `${winner} wins by resignation`,
    timeout: `${winner} wins on time`,
  };
  return reasons[result.reason] || `${winner} wins`;
}
