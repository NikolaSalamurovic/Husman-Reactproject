import styled from "styled-components";

export const StyledInput = styled.input`
    margin: 4px 0 20px 0;
    height: 30px;
    width: 390px;
    border: 2px solid #4f5b62;
    border-radius: 5px;
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
        color: lightgrey;
    }
`