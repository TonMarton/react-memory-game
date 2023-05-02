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
  background: ${(props) =>
    `linear-gradient(145deg,${props.theme.colors.cardGradient.topLeft}, ${props.theme.colors.cardGradient.bottomRight})`};
  box-shadow: ${(props) =>
    props.isFaceUp
      ? `12px 12px 18px ${props.theme.colors.cardShadow.bottomRight}, -12px -12px 18px ${props.theme.colors.cardShadow.topLeft}`
      : `9px 9px 18px ${props.theme.colors.cardShadow.bottomRight}, -9px -9px 18px ${props.theme.colors.cardShadow.topLeft}`};
  padding: 0;
  overflow: hidden;
  cursor: ${(props) => (props.isFaceUp ? 'inherit' : 'pointer')};
  transition: box-shadow 300ms, transform 300ms;
  transform: ${(props) => (props.isFaceUp ? 'scale(1.05)' : 'scale(1)')};

  &:hover {
    box-shadow: 12px 12px 18px
        ${(props) => props.theme.colors.cardShadow.bottomRight},
      -12px -12px 18px ${(props) => props.theme.colors.cardShadow.topLeft};
    transform: scale(1.05);
  }

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
