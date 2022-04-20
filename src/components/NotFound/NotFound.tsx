import "./notFound.css";
import { BiMessageAltError } from "react-icons/bi";
import { StyledButton } from "../StyledComponents/StyledButton";


export function NotFound() {
    return (
        <>
            <div className="notFoundContainer">
                <span><BiMessageAltError/></span>
                <h1>404</h1>
                <h2>Page not found</h2>
                <StyledButton>Till startsida</StyledButton>
            </div>
        </>
    )
}