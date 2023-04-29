import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html {
        font-family: 'Roboto';
        background-color: ${(props) => props.theme.colors.background};
        overflow: hidden;
    }

    html, button {
        color: ${(props) => props.theme.colors.text};
    }

    body {
        min-height: 100vh;
        box-sizing: border-box;
        margin: 0;
    }

    button {
        border-style: none;
    }
`;

export default globalStyle;
