import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { startGame, toggleTheme } from '../slices/meta';
import Button from './Button';
import { AppState } from '../store';
import Switch from './Switch';

const MenuContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  Button {
    margin-top: 20px;
  }
`;

export default function Menu() {
  const isThemeDark: boolean = useSelector(
    (state: AppState) => state.metaReducer.theme.name !== 'light',
  );
  const dispatch = useDispatch();
  return (
    <MenuContainer>
      <h1>Cat Memory</h1>
      <Button type="button" onClick={() => dispatch(startGame())}>
        Start
      </Button>
      <Switch enabled={!isThemeDark} onChange={() => dispatch(toggleTheme())} />
    </MenuContainer>
  );
}
