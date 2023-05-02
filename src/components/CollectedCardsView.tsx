import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CardsContainer from './CardsContainer';

type Props = {
  collectedCards: JSX.Element[];
  onClose: () => void;
};

const CollectedCardsViewContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.cardUltraLight};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`;

const CollectedCardsContainer = styled(CardsContainer)`
  justify-content: start;
`;

export default function CollectedCardView(props: Props) {
  const { collectedCards, onClose } = props;
  return (
    <CollectedCardsViewContainer>
      {collectedCards.length === 0 ? (
        <p>You have no cards yet :(</p>
      ) : (
        <CollectedCardsContainer>{collectedCards}</CollectedCardsContainer>
      )}

      <Button onClick={() => onClose()}>Close</Button>
    </CollectedCardsViewContainer>
  );
}
