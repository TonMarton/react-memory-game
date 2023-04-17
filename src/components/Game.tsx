import React, { useState } from 'react';
import { useGetCatImagesQuery } from '../cats';
import GameBoard from './GameBoard';
// TODO: error handling

export default function Game() {
  const [state, setState] = useState(false);
  const { data, error, isLoading, refetch } = useGetCatImagesQuery(10);

  const start = function startGame() {
    setState(true);
  };

  const stop = function stopGame() {
    setState(false);
    refetch();
  };

  if ((isLoading || error) && state) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {data && state ? (
        <GameBoard cats={data} onStop={() => stop()} />
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
