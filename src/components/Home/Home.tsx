import "./Home.css";
import image1 from "../.././assets/honey-gf7e3a6d22_1280.jpg";
import image2 from "../.././assets/415598-svetik_1920x1080.jpg";
import image3 from "../.././assets/spaghetti-g8ceb99e6c_1280.jpg";
import image4 from "../.././assets/pexels-lisa-fotios-918327.jpg";
import image5 from "../.././assets/5683239.jpg";
import imagemo1 from "../.././assets/imagemo4.jpg";
import imagemo2 from "../.././assets/imagemo2.jpg";
import imagemo3 from "../.././assets/imagemo5.jpg";
import imagemo4 from "../.././assets/415598-svetik_1920x1080 copy.jpg";
import imagemo5 from "../.././assets/5683239 copy.jpg";
export function Home() {
  return (
    <>
      <section>
        <h2 className="pageTitle">HUSMAN</h2>
        <div className="slider">
          <figure>
            <div className="slide">
              <img src={image5} alt="Bild på köttbullar" className="imageDesktop" />
              <img src={imagemo5} alt="Bild på köttbullar" className="imageMobile" />
            </div>
            <div className="slide">
              <img src={image3} alt="Bild på pasta" className="imageDesktop" />
              <img src={imagemo3} alt="Bild på pasta" className="imageMobile" />
            </div>
            <div className="slide">
              <img src={image1} alt="Bild på honung" className="imageDesktop" />
              <img src={imagemo1} alt="Bild på honung" className="imageMobile" />
            </div>
            <div className="slide">
              <img src={image4} alt="Bild på choklad" className="imageDesktop" />
              <img src={imagemo2} alt="Bild på choklad" className="imageMobile" />
            </div>
            <div className="slide">
              <img src={image2} alt="Bild på öl" className="imageDesktop" />
              <img src={imagemo4} alt="Bild på öl" className="imageMobile" />
            </div>
          </figure>
        </div>
      </section>
    </>
  );
}
