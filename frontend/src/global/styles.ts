import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        a{
            text-decoration: none;
            color: inherit;
        }
        button{
            cursor: pointer;
            :hover{
                opacity: 0.7;
            }
        }
        .pointer {
            cursor: pointer;
        }
    }
    html{
        font-size: 62.5%;
    }
`;

export default GlobalStyle;
