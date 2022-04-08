import "./Home.css";
import image1 from "./assets/honey-gf7e3a6d22_1280.jpg";
import image2 from "./assets/vegetable-g54055c845_1280.jpg";
import image3 from "./assets/spaghetti-g8ceb99e6c_1280.jpg";
import image4 from "./assets/pexels-lisa-fotios-918327.jpg";
import image5 from "./assets/pexels-jonathan-borba-2983101.jpg";
export function Home() {
  return (
    <>
      <section>
        {/* <div className="container_home">
          <div className="slide_show">
            <div class="slide first"></div>
          </div>
        </div> */}
        <h1>HUSMAN</h1>
        <div className="slider">
          <figure>
            <div className="slide">
              <img src={image1} alt="" />
            </div>
            <div className="slide">
              <img src={image2} alt="" />
            </div>
            <div className="slide">
              <img src={image3} alt="" />
            </div>
            <div className="slide">
              <img src={image4} alt="" />
            </div>
            <div className="slide">
              <img src={image5} alt="" />
            </div>
          </figure>
        </div>
      </section>
    </>
  );
}
