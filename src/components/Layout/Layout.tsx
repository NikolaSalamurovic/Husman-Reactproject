import { Outlet } from "react-router-dom";
import { StyledLink } from "../StyledComponents/StyledLink";
import "./layout.css";

export function Layout() {
  return (
    <>
      <header>
        <div>
          <h1>Husman</h1>
          <nav>
            <ul>
              <StyledLink to="/">
                <li>Home</li>
              </StyledLink>
              <StyledLink to="/Booking">
                <li>Booking</li>
              </StyledLink>
              <StyledLink to="/Contact">
                <li>Contact</li>
              </StyledLink>
              <StyledLink to="/Admin">
                <li>Admin</li>
              </StyledLink>
              <StyledLink to="/About">
                <li>About us</li>
              </StyledLink>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
