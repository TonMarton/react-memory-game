import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { flipBackAfterIncorrect, quitGame } from '../slices/game';
import { AppState, useAppDispatch } from '../store';
import { Cat } from '../types';
import Card from './Card';
import EmptyCardPlace from './EmptyCardPlace';

type Props = {
  cats: Cat[];
  onStop: () => void;
};

const GameBoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 420px;
  gap: 20px;
  justify-content: space-between;
`;

export default function GameBoard(props: Props) {
  const { cats, onStop } = props;
  const { flippedCardId, nomatchCardId, collectedCardIds, pairsLeft } =
    useSelector((state: AppState) => state.gameReducer);
  const dispatch = useAppDispatch();
  const collectedCards: JSX.Element[] = [];
  const playableCards: JSX.Element[] = [];

  cats.forEach((cat: Cat) => {
    if (collectedCardIds.includes(cat.id)) {
      collectedCards.push(<Card cat={cat} isFlipped isDisabled />);
      playableCards.push(<EmptyCardPlace />);
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

  const quit = useCallback(() => {
    dispatch(quitGame());
    onStop();
  }, [dispatch, onStop]);

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

  useEffect(() => {
    if (pairsLeft === 0) {
      quit();
    }
  }, [pairsLeft, dispatch, quit]);

  return (
    <GameBoardContainer>
      <CardsContainer>{playableCards}</CardsContainer>
      <p>Collected cards:</p>
      <CardsContainer>{collectedCards}</CardsContainer>
      <p>Pairs to collect: {pairsLeft}</p>
      <button type="button" onClick={quit}>
        Quit
      </button>
    </GameBoardContainer>
  );
}
