import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
html {
    font-family: 'Roboto';
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
}
`;

export default globalStyle;
