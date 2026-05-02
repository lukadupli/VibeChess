import { useState } from "react";
import { TIME_CONTROL_PRESETS } from "../../lib/timeControl";
import type { TimeControl } from "../../types/game";

interface NewGameModalProps {
  onStart: (timeControl: TimeControl | null) => void;
  onClose: () => void;
}

export function NewGameModal({ onStart, onClose }: NewGameModalProps) {
  const [selected, setSelected] = useState<TimeControl | null>(null);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">New Game</h2>
        <div className="tc-grid">
          <button
            className={`tc-btn${selected === null ? " tc-btn-selected" : ""}`}
            onClick={() => setSelected(null)}
          >
            No Clock
          </button>
          {TIME_CONTROL_PRESETS.map(({ label, value }) => (
            <button
              key={label}
              className={`tc-btn${selected === value ? " tc-btn-selected" : ""}`}
              onClick={() => setSelected(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="btn btn-start" onClick={() => onStart(selected)}>
          Start
        </button>
      </div>
    </div>
  );
}
