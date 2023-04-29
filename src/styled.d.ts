import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      background: string;
      card: string;
      cardLight: string;
      cardUltraLight: string;
      text: string;
    };
  }
}
