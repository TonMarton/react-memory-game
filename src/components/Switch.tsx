import React from 'react';
import styled from 'styled-components';

type Props = {
  enabled: boolean;
  onChange: () => void;
};

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SliderContainer = styled.div<{ enabled: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.enabled ? 'start' : 'end')};
  width: 70px;
  background-color: ${(props) => props.theme.colors.cardUltraLight};
  border: solid 3px gray;
  padding: 2px;
  border-radius: 20px;
  cursor: pointer;
`;

const Slider = styled.span`
  display: inline-block;
  content: '';
  flex: 30px 0 0;
  height: 30px;
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 20px;
`;

export default function Switch(props: Props) {
  const { enabled, onChange } = props;
  return (
    <SwitchContainer>
      <p>{enabled ? 'Dark theme' : 'Light theme'}</p>
      <SliderContainer enabled={enabled} onClick={onChange}>
        <Slider />
      </SliderContainer>
    </SwitchContainer>
  );
}
