import { useState } from "react";
import { ChessBoard } from "./components/Board/ChessBoard";
import { ClockBar } from "./components/Clocks/ClockBar";
import { NewGameModal } from "./components/Modals/NewGameModal";
import { useGameStore } from "./store/gameSlice";
import { useClockStore } from "./store/clockSlice";
import { useClock } from "./hooks/useClock";
import { resultLabel } from "./lib/gameResult";
import type { TimeControl } from "./types/game";
import "./App.css";

function GameOverOverlay() {
  const result = useGameStore((s) => s.result);
  const [showModal, setShowModal] = useState(false);
  const startGame = useGameStore((s) => s.startGame);
  const clockInit = useClockStore((s) => s.init);
  const clockStart = useClockStore((s) => s.start);
  const clockReset = useClockStore((s) => s.reset);

  if (!result) return null;

  function handleStart(timeControl: TimeControl | null) {
    startGame({ mode: "hvh", timeControl });
    if (timeControl) {
      clockInit(timeControl.initialMs, timeControl.incrementMs);
      clockStart("w");
    } else {
      clockReset();
    }
    setShowModal(false);
  }

  return (
    <>
      <div className="overlay">
        <div className="overlay-card">
          <p className="overlay-result">{resultLabel(result)}</p>
          <button className="btn" onClick={() => setShowModal(true)}>
            New Game
          </button>
        </div>
      </div>
      {showModal && (
        <NewGameModal onStart={handleStart} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

function App() {
  useClock();

  const gameStatus = useGameStore((s) => s.gameStatus);
  const chess = useGameStore((s) => s.chess);
  const startGame = useGameStore((s) => s.startGame);
  const resign = useGameStore((s) => s.resign);
  const settings = useGameStore((s) => s.settings);
  const clockInit = useClockStore((s) => s.init);
  const clockStart = useClockStore((s) => s.start);
  const clockReset = useClockStore((s) => s.reset);

  const hasClock = !!settings.timeControl;
  const [showModal, setShowModal] = useState(false);

  function handleStart(timeControl: TimeControl | null) {
    startGame({ mode: "hvh", timeControl });
    if (timeControl) {
      clockInit(timeControl.initialMs, timeControl.incrementMs);
      clockStart("w");
    } else {
      clockReset();
    }
    setShowModal(false);
  }

  return (
    <div className="app">
      {hasClock && <ClockBar color="b" />}
      <div className="board-area">
        <ChessBoard />
        <GameOverOverlay />
      </div>
      {hasClock && <ClockBar color="w" />}
      <div className="controls">
        {gameStatus === "playing" && (
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
              New Game
            </button>
            <button
              className="btn btn-danger"
              onClick={() => resign(chess.turn())}
            >
              Resign
            </button>
          </>
        )}
      </div>
      {showModal && (
        <NewGameModal onStart={handleStart} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;
