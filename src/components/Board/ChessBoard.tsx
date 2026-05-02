import { Chessboard } from "react-chessboard";
import type { Square, Piece, PromotionPieceOption } from "react-chessboard/dist/chessboard/types";
import { useGameStore } from "../../store/gameSlice";

const BOARD_WIDTH = 560;

function isPromotion(source: Square, target: Square, piece: Piece): boolean {
  return (
    ((piece === "wP" && source[1] === "7" && target[1] === "8") ||
      (piece === "bP" && source[1] === "2" && target[1] === "1")) &&
    Math.abs(source.charCodeAt(0) - target.charCodeAt(0)) <= 1
  );
}

export function ChessBoard() {
  const { fen, gameStatus, makeMove } = useGameStore();

  function onPieceDrop(source: Square, target: Square): boolean {
    return makeMove(source, target);
  }

  function onPromotionPieceSelect(
    piece?: PromotionPieceOption,
    fromSquare?: Square,
    toSquare?: Square
  ): boolean {
    if (!piece || !fromSquare || !toSquare) return false;
    const promotionPiece = piece[1].toLowerCase();
    return makeMove(fromSquare, toSquare, promotionPiece);
  }

  return (
    <Chessboard
      boardWidth={BOARD_WIDTH}
      position={fen}
      onPieceDrop={onPieceDrop}
      onPromotionCheck={isPromotion}
      onPromotionPieceSelect={onPromotionPieceSelect}
      promotionDialogVariant="modal"
      arePiecesDraggable={gameStatus === "playing"}
    />
  );
}
