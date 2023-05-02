import React from 'react';
import styled from 'styled-components';

const EmptyCardPlaceContainer = styled.div`
  width: 88px;
  height: 88px;
  background-color: ${(props) => props.theme.colors.cardLight};
  border-radius: 16px;
`;

export default function EmptyCardPlace() {
  return <EmptyCardPlaceContainer />;
}
