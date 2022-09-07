import styled from "styled-components";
import { theme } from "../constantes";
import { btnReset } from "../styles/variables";


export const CotizacionContainer = styled.div`
    background-color: ${({ white }) => (!white ? theme.grayLightest : 'white')};
    padding: 50px;
    min-height: 65vh;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 768px){
        padding: 1rem;
    }
    
`

export const CotizacionHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const CotizacionHeaderPrint = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
`

export const CotizacionDateContainer = styled.div`
    display: flex;
    flex-direction: column;
`


export const CotizacionCustomerInfo = styled.div`
width: 100%;
margin-top: 20px;

`

export const CotizacionCustomerInfoContainer = styled.div`
    width: 75%;
    @media screen and (max-width: 768px){
        width: 100%;
    }
`

export const CotizacionColumn = styled.div`
    width: 30%;
`

export const Field = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${({ align }) => (!align ? 'space-between' : align)};
    align-items: ${({ center }) => (!center ? 'flex-start' : 'center')};
    margin-bottom: 1rem;

    @media screen and (max-width: 768px){
        flex-direction: column;
        justify-content: flex-start;
    }


`
export const FieldPrint = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${({ align }) => (!align ? 'space-between' : align)};
    align-items: ${({ center }) => (!center ? 'flex-start' : 'center')};
    font-size: .8rem;
    margin-bottom: .2rem;
`



export const Label = styled.p`
    font-weight: ${({ bold }) => (!bold ? 700 : 800)};
    margin-right: 1rem;
    @media screen and (max-width: 768px){
        margin-bottom: .2rem;
    }
    `
export const LabelPrint = styled.label`
    font-weight: ${({ bold }) => (!bold ? 700 : 800)};
    margin-right: .5rem;   
    margin-left: .5rem;
    `
export const TextPrint = styled.label`
    margin-left: .5rem;
    `

export const Input = styled.input`
    min-width: 50%;
    display: block;
    margin: 0;
    font-family: inherit;
    font-weight: inherit;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 0.1rem;
    transition: box-shadow var(300ms);
    padding: .5rem .8rem;
    font-size: 1rem;
    line-height: var(1.8);
    background-color: ${({ readOnly }) => (!readOnly ? `white` : theme.grayLight)};
    color: ${theme.grayDark};
;
   
    &::placeholder {
        color: #B0BEC5;
    }

    &:focus {
        outline: none;
        box-shadow: 0.2rem 0.8rem 1.6rem #B0BEC5;
    }

`
export const Textarea = styled.textarea`
    min-width: 50%;
    display: block;
    margin: 0;
    color: inherit;
    font-family: inherit;
    font-weight: inherit;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 0.1rem;
    transition: box-shadow var(300ms);
    padding: .5rem .8rem;
    font-size: 1rem;
    line-height: var(1.8);
    resize: none;

    &::placeholder {
        color: #B0BEC5;
    }

    &:focus {
        outline: none;
        box-shadow: 0.2rem 0.8rem 1.6rem #B0BEC5;
    }
`

export const CheckBoxContainer = styled.div`
`

export const CotizacionPaidContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    padding: 15px 0;
`

export const CotizacionPaid = styled.div`
    width: 50%;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`
export const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: auto;
    align-items: center;
    border-top: ${({noBorder}) =>(!noBorder ? '.1rem solid #444444' : 'none')} ;
    padding: 15px 0;
    
    button{
        color:white;
        margin-left: 2rem;
    }

    @media screen and (max-width: 768px){
        justify-content: center    
    }


`

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin: 0px !important;
    height: 100%;
    min-height:200px;
`

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const ModalBody = styled.div`
    display: flex;
`
export const ModalFooter = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
`


export const CalendarSidebar  = styled.div`
    display: flex;
    width: 300px;
    line-height: 1.5;
    background: #eaf9ff;
    border-right: 1px solid #d3e2e8;
    transition: .5s ease-in-out 0s;
    height: 100vh;
    overflow: -moz-scrollbars-vertical; 
    overflow-y: scroll;
    
    @media screen and (max-width: 480px){
    top: 90px;
    padding: 10px;
    z-index: 2;
    height: 90vh;
    
    position: ${({ isOpen }) => (!isOpen ? 'fixed' : 'absolute')};    
        width: ${({ isOpen }) => (!isOpen ? '0' : '230px')};    
        left: ${({ isOpen }) => (isOpen ? `0px` : `-200px`)};
    }
`


export const CalendarSidebarButton = styled.button`
    ${btnReset};
    position: fixed;
    top: 100px !important;
    left: ${({ isOpen }) => (isOpen ? `212px` : `7px`)};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0 0 4px ${theme.secondaryColor}, 0 0 7px ${theme.secondaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${theme.secondaryColor};
    transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
    display: none;

    @media screen and (max-width: 480px){
        z-index: 999999 !important;
        display: flex;
        top: 10px;
        right: ${({ isOpen }) => (isOpen ? `-16px` : `-220px`)};

    }
`;

export const CalendarContainer = styled.div`
        flex-grow: 1;
    padding: 3em;
    
    @media screen and (max-width: 480px){
        padding: 0;
        margin: 0;
        font-size: .7rem !important;
    }
`;

