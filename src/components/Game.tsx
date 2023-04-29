import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCatImagesQuery } from '../cats';
import { stopGame } from '../slices/meta';
import { AppState } from '../store';
import GameBoard from './GameBoard';
import Menu from './Menu';
// TODO: error handling

export default function Game() {
  const isInGame = useSelector((state: AppState) => state.metaReducer.isInGame);
  const dispatch = useDispatch();
  const { data, error, isLoading, refetch } = useGetCatImagesQuery(10);

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
        <Menu />
      )}
    </div>
  );
}
