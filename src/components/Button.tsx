import styled from 'styled-components';

const Button = styled.button`
  width: 240px;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 24px;
  background-color: ${(props) => props.theme.colors.card};
  transition: box-shadow 200ms;

  &:hover {
    box-shadow: 4px 4px 10px;
    cursor: pointer;
  }
`;

export default Button;
