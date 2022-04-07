import { Link, Outlet } from "react-router-dom";
import "./layout.css";

export function Layout() {
  return (
    <>
      <header>
        <h1>Husman</h1>
        <nav>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/Booking">
              <li>Booking</li>
            </Link>
            <Link to="/Contact">
              <li>Contact</li>
            </Link>
            <Link to="/Admin">
              <li>Admin</li>
            </Link>
            <Link to="/About">
              <li>About us</li>
            </Link>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
