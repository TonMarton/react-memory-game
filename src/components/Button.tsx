import styled from 'styled-components';

const Button = styled.button`
  width: 240px;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 24px;
  background-color: ${(props) => props.theme.colors.card};
  transition: box-shadow 300ms;

  &:hover {
    box-shadow: 8px 8px 12px
        ${(props) => props.theme.colors.cardShadow.bottomRight},
      -12px -12px 18px ${(props) => props.theme.colors.cardShadow.topLeft};
    cursor: pointer;
  }
`;

export default Button;
