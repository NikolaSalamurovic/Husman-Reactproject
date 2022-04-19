import styled from "styled-components";

export const StyledButton = styled.button`
    height: 35px;
    background-color: #b71c1c;
    color: white;
    border-radius: 3px;
    border: 1px solid #b71c1c;
    outline: 0;
    padding: 0 10px;
    cursor: pointer;
    transition: ease-in-out 250ms;
    :hover {
        border: 1px solid #7f0000;
        background-color: #7f0000;
    }
`;