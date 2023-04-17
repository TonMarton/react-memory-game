import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCatImagesQuery } from '../cats';
import { startGame, stopGame } from '../slices/meta';
import { AppState } from '../store';
import GameBoard from './GameBoard';
// TODO: error handling

export default function Game() {
  const { isInGame } = useSelector((state: AppState) => state.metaReducer);
  const dispatch = useDispatch();
  const { data, error, isLoading, refetch } = useGetCatImagesQuery(10);

  const start = function start() {
    dispatch(startGame());
  };

  const stop = function stop() {
    dispatch(stopGame());
    refetch();
  };

  if ((isLoading || error) && isInGame) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {data && isInGame ? (
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
