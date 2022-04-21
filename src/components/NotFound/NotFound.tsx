import "./notFound.css";
import { BiMessageAltError } from "react-icons/bi";
import { StyledButton } from "../StyledComponents/StyledButton";
import { StyledLink } from "../StyledComponents/StyledLink";


export function NotFound() {
    return (
        <>
            <div className="notFoundContainer">
                <span><BiMessageAltError/></span>
                <h1>404</h1>
                <h2>Page not found</h2>
                <StyledLink to="/">
                    <StyledButton>Till startsidan</StyledButton>
                </StyledLink>
            </div>
        </>
    )
}