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
        ::-webkit-scrollbar{
            width: 13px;
            height: 13px;
        }
        ::-webkit-scrollbar-thumb{
            background: #B3AFB3;
            border-radius: 9px;
        }
        ::-webkit-scrollbar-thumb:hover{
            background: #B3AFB3;
        }
        ::-webkit-scrollbar-track{
            background: #FFFFFF;
            border-radius: 9px;
            box-shadow: inset 0px 0px 0px 0px #F0F0F0;
        }
    }
    html{
        font-size: 62.5%;
    }
`;

export default GlobalStyle;
