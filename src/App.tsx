import { Chessboard } from "react-chessboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="board-container">
        <Chessboard
          options={{
            position: "start",
            boardStyle: { width: "560px", height: "560px" },
          }}
        />
      </div>
    </div>
  );
}

export default App;
