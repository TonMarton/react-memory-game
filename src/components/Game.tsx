import React, { useState } from 'react';
import GameBoard from './GameBoard';

export default function Game() {
  const [state, setState] = useState(false);
  const start = function startGame() {
    setState(true);
  };
  const stop = function stopGame() {
    setState(false);
  };
  return (
    <div>
      {state ? (
        <GameBoard onStop={() => stop()} />
      ) : (
        <>
          <h1>Cat Memory</h1>
          <button type="button" onClick={start}>
            Start
          </button>
        </>
      )}
    </div>
  );
}
