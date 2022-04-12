import { useState } from "react";
import { Outlet } from "react-router-dom";
import { StyledLink } from "../StyledComponents/StyledLink";
import { FaBars } from "react-icons/fa";
import "./layout.css";

export function Layout() {
  const [openMenu, setOpenMenu] = useState("mobileMenuDeactive")

  function toggleClass() {
    if(openMenu === "mobileMenuDeactive") {
      setOpenMenu("mobileMenuActive");
    } else {
      setOpenMenu("mobileMenuDeactive");
    };
    console.log(openMenu);
    
  }

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
          <FaBars className="faBars" onClick={toggleClass}/>  
        </div>
        <div className={openMenu}>
          <ul>
            <StyledLink to="/" onClick={toggleClass}>
              <li>Home</li>
            </StyledLink>
            <StyledLink to="/Booking" onClick={toggleClass}>
              <li>Booking</li>
            </StyledLink>
            <StyledLink to="/Contact" onClick={toggleClass}>
              <li>Contact</li>
            </StyledLink>
            <StyledLink to="/Admin" onClick={toggleClass}>
              <li>Admin</li>
            </StyledLink>
            <StyledLink to="/About" onClick={toggleClass}>
              <li>About us</li>
            </StyledLink>
          </ul>
        </div>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
