import { style } from "@mui/system";
import styled from "styled-components";
import { theme } from "../../constantes";

export const TodoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
    @media screen and (max-width: 768px){
        flex-direction: column;

    }

`

export const TodoColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    background-color: white;
    border-radius: 5px;
    padding: .5rem 1.5rem;

    @media screen and (max-width: 768px){
        width: 100%;
        margin-top: 1rem;
    }
`

export const TodoH3 = styled.h3`
   margin-top: 1rem;
`

export const Line = styled.hr`
    border-top: 1px solid  ${({ color }) => (!color ? theme.grayLightest  : color )};
    margin: 2rem 0;
`