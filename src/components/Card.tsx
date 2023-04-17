import React from 'react';
import styled from 'styled-components';
import { selectCard } from '../slices/game';
import { useAppDispatch } from '../store';
import { Cat } from '../types';

const CardContainer = styled.button<{ isFaceUp: boolean }>`
  width: 32px;
  height: 32px;
  color: white;
  background-color: blue;

  img {
    visibility: ${(props) => (props.isFaceUp ? 'visible' : 'hidden')};
    object-fit: cover;
  }
`;

type Props = {
  isFlipped: boolean;
  isDisabled: boolean;
  cat: Cat;
};

export default function Card(props: Props) {
  const {
    isFlipped,
    isDisabled,
    cat: { id, url },
  } = props;
  const dispatch = useAppDispatch();

  const turnOver = function turnCardOver() {
    dispatch(selectCard(id));
  };

  return (
    <CardContainer
      onClick={() => turnOver()}
      isFaceUp={isFlipped}
      disabled={isDisabled}
    >
      <img src={url} alt="cat" width="32" height="32" />
    </CardContainer>
  );
}
