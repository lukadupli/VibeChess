import { useState } from "react";
import { TIME_CONTROL_PRESETS } from "../../lib/timeControl";
import type { TimeControl } from "../../types/game";

interface NewGameModalProps {
  onStart: (timeControl: TimeControl | null) => void;
  onClose: () => void;
}

type Selection = TimeControl | "custom" | null;

function CustomFields({
  onCommit,
}: {
  onCommit: (tc: TimeControl) => void;
}) {
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("0");
  const [increment, setIncrement] = useState("0");

  function parse() {
    const m = Math.max(0, parseInt(minutes) || 0);
    const s = Math.max(0, Math.min(59, parseInt(seconds) || 0));
    const inc = Math.max(0, parseInt(increment) || 0);
    const initialMs = (m * 60 + s) * 1000;
    if (initialMs === 0) return;
    onCommit({ initialMs, incrementMs: inc * 1000 });
  }

  return (
    <div className="custom-fields">
      <label className="custom-label">
        Minutes
        <input
          className="custom-input"
          type="number"
          min="0"
          max="180"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          onBlur={parse}
        />
      </label>
      <label className="custom-label">
        Seconds
        <input
          className="custom-input"
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          onBlur={parse}
        />
      </label>
      <label className="custom-label">
        Increment (s)
        <input
          className="custom-input"
          type="number"
          min="0"
          max="60"
          value={increment}
          onChange={(e) => setIncrement(e.target.value)}
          onBlur={parse}
        />
      </label>
    </div>
  );
}

export function NewGameModal({ onStart, onClose }: NewGameModalProps) {
  const [selection, setSelection] = useState<Selection>(null);
  const [customTc, setCustomTc] = useState<TimeControl | null>(null);

  function resolvedTc(): TimeControl | null {
    if (selection === null) return null;
    if (selection === "custom") return customTc;
    return selection;
  }

  function handleStart() {
    if (selection === "custom" && !customTc) return;
    onStart(resolvedTc());
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">New Game</h2>
        <div className="tc-grid">
          <button
            className={`tc-btn${selection === null ? " tc-btn-selected" : ""}`}
            onClick={() => setSelection(null)}
          >
            No Clock
          </button>
          {TIME_CONTROL_PRESETS.map(({ label, value }) => (
            <button
              key={label}
              className={`tc-btn${selection === value ? " tc-btn-selected" : ""}`}
              onClick={() => setSelection(value)}
            >
              {label}
            </button>
          ))}
          <button
            className={`tc-btn${selection === "custom" ? " tc-btn-selected" : ""}`}
            onClick={() => setSelection("custom")}
          >
            Custom
          </button>
        </div>
        {selection === "custom" && (
          <CustomFields
            onCommit={(tc) => setCustomTc(tc)}
          />
        )}
        <button
          className="btn btn-start"
          disabled={selection === "custom" && !customTc}
          onClick={handleStart}
        >
          Start
        </button>
      </div>
    </div>
  );
}
