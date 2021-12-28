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
            border: none;
            background: none;
            :hover{
                opacity: 0.7;
            }
        }
        .pointer {
            cursor: pointer;
        }
        .centered {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    html{
        font-size: 62.5%;
    }
`;

export default GlobalStyle;
