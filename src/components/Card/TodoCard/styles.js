import { style } from "@mui/system";
import styled from "styled-components";
import { theme } from "../../../constantes";

export const TodoCardContainer = styled.div`
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid  ${({ color }) => (!color ? theme.grayLightest  : color )};
    border-left: 5px solid  ${({ color }) => (!color ? theme.grayLightest  : color )};
    cursor: pointer;
`

export const TodoTime = styled.small`
    float: right;
`