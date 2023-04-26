import React from 'react';
import styled from 'styled-components';
import { selectCard } from '../slices/game';
import { useAppDispatch } from '../store';
import { Cat } from '../types';

const CardContainer = styled.button<{ isFaceUp: boolean }>`
  width: 88px;
  height: 88px;
  color: white;
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 16px;
  background: linear-gradient(145deg, #ff9d96, #e5847e);
  box-shadow: 9px 9px 18px #bc6d68, -9px -9px 18px #ffb9b0;

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
      <img src={url} alt="cat" width="88" height="88" />
    </CardContainer>
  );
}
