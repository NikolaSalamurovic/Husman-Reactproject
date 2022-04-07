import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export function Home() {
  const navigation = useNavigate();
  function navigateAbout() {
    navigation("/About");
  }
  function navigateBooking() {
    navigation("/Booking");
  }
  function navigateContact() {
    navigation("/Contact");
  }

  return (
    <>
      <section>
        <div className="container_home">
          <div className="slide_show">
            <article className="welcome_card">
              <h1>Välkommen till Husman</h1>
              <p>Fine-dining Husman av bästa kvalitet!</p>
              <div className="container_buttons">
                <button onClick={navigateAbout}>Om oss</button>
                <button onClick={navigateBooking}>Bokning</button>
                <button onClick={navigateContact}>Contact</button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
