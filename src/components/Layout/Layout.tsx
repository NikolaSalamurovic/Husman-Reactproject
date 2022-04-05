import { Link, Outlet } from "react-router-dom";
import "./layout.css";

export function Layout() {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Booking">Booking</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
          <li>
            <Link to="/Admin">Admin</Link>
          </li>
          <li>
            <Link to="/About">About us</Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
