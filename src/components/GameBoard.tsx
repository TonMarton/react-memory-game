import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetCatImagesQuery } from '../cats';
import { flipBackAfterIncorrect } from '../reducer';
import { AppState, useAppDispatch } from '../store';
import { Cat } from '../types';
import Card from './Card';

type Props = {
  onStop: () => void;
};

const CardsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
// TODO: error handling
export default function GameBoard(props: Props) {
  const { onStop } = props;
  const { data, error, isLoading } = useGetCatImagesQuery(10);
  const { flippedCardId, nomatchCardId, collectedCardIds } = useSelector(
    (state: AppState) => state.reducer,
  );
  const dispatch = useAppDispatch();
  const collectedCards: JSX.Element[] = [];
  const playableCards: JSX.Element[] = [];
  if (data) {
    data.forEach((cat: Cat) => {
      if (collectedCardIds.includes(cat.id)) {
        collectedCards.push(<Card cat={cat} isFlipped isDisabled />);
      } else {
        playableCards.push(
          <Card
            cat={cat}
            isFlipped={flippedCardId === cat.id || nomatchCardId === cat.id}
            isDisabled={nomatchCardId !== null}
          />,
        );
      }
    });
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (nomatchCardId) {
      timer = setTimeout(() => {
        dispatch(flipBackAfterIncorrect());
      }, 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [nomatchCardId, dispatch]);

  return (
    <div>
      {isLoading || error ? (
        <div>Loading...</div>
      ) : (
        <>
          <CardsContainer>{playableCards}</CardsContainer>
          <p>Collected cards:</p>
          <CardsContainer>{collectedCards}</CardsContainer>
          <button type="button" onClick={onStop}>
            Quit
          </button>
        </>
      )}
    </div>
  );
}
