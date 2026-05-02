import { useEffect } from "react";
import { ChessBoard } from "./components/Board/ChessBoard";
import { useGameStore } from "./store/gameSlice";
import { resultLabel } from "./lib/gameResult";
import "./App.css";

function GameOverOverlay() {
  const { result, startGame } = useGameStore();
  if (!result) return null;

  return (
    <div className="overlay">
      <div className="overlay-card">
        <p className="overlay-result">{resultLabel(result)}</p>
        <button className="btn" onClick={() => startGame()}>
          New Game
        </button>
      </div>
    </div>
  );
}

function App() {
  const { startGame, gameStatus, resign, chess } = useGameStore();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="app">
      <div className="board-area">
        <ChessBoard />
        <GameOverOverlay />
      </div>
      {gameStatus === "playing" && (
        <div className="controls">
          <button className="btn btn-secondary" onClick={() => startGame()}>
            New Game
          </button>
          <button
            className="btn btn-danger"
            onClick={() => resign(chess.turn())}
          >
            Resign
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
