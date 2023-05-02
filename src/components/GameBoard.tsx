import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  collectAfterPairFound,
  flipBackAfterIncorrect,
  quitGame,
} from '../slices/game';
import { AppState, useAppDispatch } from '../store';
import { Cat } from '../types';
import Button from './Button';
import Card from './Card';
import CardsContainer from './CardsContainer';
import CollectedCardsView from './CollectedCardsView';
import EmptyCardPlace from './EmptyCardPlace';

type Props = {
  cats: Cat[];
  onStop: () => void;
};

const GameBoardContainer = styled.div<{ isGameWon: boolean }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.isGameWon ? '20px' : '100px')};
  flex-direction: ${(props) => (props.isGameWon ? 'column' : 'inherit')};
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const CounterText = styled.p`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;

export default function GameBoard(props: Props) {
  const { cats, onStop } = props;
  const [isGameWon, setIsGameWon] = useState(false);
  const [shouldShowCollectedCards, setShouldShowCollectedCards] =
    useState(false);
  const {
    flippedCardId,
    nomatchCardId,
    matchCardIds,
    collectedCardIds,
    pairsLeft,
  } = useSelector((state: AppState) => state.gameReducer);
  const dispatch = useAppDispatch();
  const collectedCards: JSX.Element[] = [];
  const playableCards: JSX.Element[] = [];

  cats.forEach((cat: Cat) => {
    if (collectedCardIds.includes(cat.id)) {
      if (cat.id.slice(-1) === '0') {
        collectedCards.push(<Card cat={cat} isFlipped isDisabled />);
      }
      playableCards.push(<EmptyCardPlace />);
    } else {
      playableCards.push(
        <Card
          cat={cat}
          isFlipped={
            flippedCardId === cat.id ||
            nomatchCardId === cat.id ||
            matchCardIds[0] === cat.id ||
            matchCardIds[1] === cat.id
          }
          isDisabled={nomatchCardId !== null || matchCardIds.length !== 0}
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
    let timer: NodeJS.Timeout;
    if (matchCardIds.length !== 0) {
      timer = setTimeout(() => {
        dispatch(collectAfterPairFound());
      }, 1500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [matchCardIds, dispatch]);

  useEffect(() => {
    if (pairsLeft === 0) {
      setIsGameWon(true);
    }
  }, [pairsLeft, setIsGameWon]);

  return (
    <GameBoardContainer isGameWon={isGameWon}>
      {isGameWon ? (
        <>
          <h2>Game Over</h2>
          <p>Congratulations, you have found all the cats!</p>
        </>
      ) : (
        <CardsContainer>{playableCards}</CardsContainer>
      )}
      <ControlsContainer>
        {!isGameWon && <CounterText>Pairs to collect: {pairsLeft}</CounterText>}
        <Button
          onClick={() => setShouldShowCollectedCards(!shouldShowCollectedCards)}
        >
          Collected cards
        </Button>
        {shouldShowCollectedCards && (
          <CollectedCardsView
            collectedCards={collectedCards}
            onClose={() =>
              setShouldShowCollectedCards(!shouldShowCollectedCards)
            }
          />
        )}
        <Button onClick={quit}>Quit</Button>
      </ControlsContainer>
    </GameBoardContainer>
  );
}
