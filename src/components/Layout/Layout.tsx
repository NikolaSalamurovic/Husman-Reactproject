import { useState } from "react";
import { Outlet } from "react-router-dom";
import { StyledLink } from "../StyledComponents/StyledLink";
import { FaBars } from "react-icons/fa";
import "./layout.css";

export function Layout() {
  const [openMenu, setOpenMenu] = useState("mobileMenuDeactive");

  function toggleClass() {
    if (openMenu === "mobileMenuDeactive") {
      setOpenMenu("mobileMenuActive");
    } else {
      setOpenMenu("mobileMenuDeactive");
    }
  }

  return (
    <>
      <header>
        <div>
          <h1>Husman</h1>
          <nav>
            <ul>
              <StyledLink to="/">
                <li>Hem</li>
              </StyledLink>
              <StyledLink to="/About">
                <li>Om oss</li>
              </StyledLink>
              <StyledLink to="/Booking">
                <li>Boka bord</li>
              </StyledLink>
              <StyledLink to="/Contact">
                <li>Kontakta oss</li>
              </StyledLink>
              <StyledLink to="/Admin">
                <li>Admin</li>
              </StyledLink>
            </ul>
          </nav>
          <FaBars className="faBars" onClick={toggleClass} />
        </div>
        <div className={openMenu}>
          <ul>
            <StyledLink to="/" onClick={toggleClass}>
              <li>Hem</li>
            </StyledLink>
            <StyledLink to="/About" onClick={toggleClass}>
              <li>Om oss</li>
            </StyledLink>
            <StyledLink to="/Booking" onClick={toggleClass}>
              <li>Boka bord</li>
            </StyledLink>
            <StyledLink to="/Contact" onClick={toggleClass}>
              <li>Kontakta oss</li>
            </StyledLink>
            <StyledLink to="/Admin" onClick={toggleClass}>
              <li>Admin</li>
            </StyledLink>
          </ul>
        </div>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <div className="footerContainer">
          <div className="footerContact">
            <p className="bold">Kontaktinformation:</p>
            <p>??regatan 1</p>
            <p>123 45</p>
            <p>??re</p>
            <p>
              <span className="bold">Telefon:</span> 123 456 78 90
            </p>
          </div>
          <div className="footerOpen">
            <p>
              <span className="bold">??ppettider:</span>
            </p>
            <p>
              <span className="bold">M??ndag:</span> St??ngt
            </p>
            <p>
              <span className="bold">Tisdag-Torsdag:</span> 11:30-21:30
            </p>
            <p>
              <span className="bold">Fredag-S??ndag:</span> 11:30-23:30
            </p>
          </div>
          <div className="footerMobile">
            <p className="bold">Kontaktinformation:</p>
            <p>??regatan 1</p>
            <p>123 45</p>
            <p>??re</p>
            <p>
              <span className="bold">Telefon:</span> 123 456 78 90
            </p>
            <p>
              <span className="bold">??ppettider:</span>
            </p>
            <p>
              <span className="bold">M??ndag:</span> St??ngt
            </p>
            <p>
              <span className="bold">Tisdag-Torsdag:</span> 11:30-21:30
            </p>
            <p>
              <span className="bold">Fredag-S??ndag:</span> 11:30-23:30
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
