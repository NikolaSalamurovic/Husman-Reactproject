import styled from "styled-components";

export const StyledInput = styled.input`
    margin: 4px 0 20px 0;
    height: 30px;
    width: 85vw;
    max-width: 390px;
    border: 1px solid #d1d1d1;
    outline: 0;
    border-radius: 3px;
    background-color: white;
    padding: 0 5px;
    transition: ease-in-out 250ms;
    :focus {
        background-color: rgb(244, 244, 244);
        outline: none;
    }
    :hover {
        background-color: rgb(244, 244, 244);
    }
    ::placeholder {
        color: rgb(190, 190, 190);
    }
`