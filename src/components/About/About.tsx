import "./About.css";

export function About() {
  return (
    <>
      <div className="blurredBackground"></div>
      <div className="containerAbout">
        <section className="aboutCard">
          <h2 className="aboutTitle">HUSMAN</h2>
          <p className="aboutParagraph">
            Koncept: Husman är en Åre-besökares dröm! Inrett för semester men
            smakar som hemma! Konceptet är enkelt, fine-dining husmanskost som
            är traditionellt lagad men modernt presenterat! Lägg till några
            härliga cocktails till din mat eller drick din favorit-lager.
          </p>
          <p className="aboutEvents">Missa inte våra kommande event:</p>
          <ul>
            <li className="listItemEvents">
              <h3>23/-2022</h3>
              <p>After-ski med köttbullar och lingon!</p>
            </li>
            <li className="listItemEvents">
              <h3>22/5-2022</h3>
              <p>Schlager-Quiz-Night med pytt-i-panna och stekt ägg!</p>
            </li>
            <li className="listItemEvents">
              <h3>2/6-2022</h3>
              <p>
                Singelmingel med Råraka och Happy Hour mellan kl.16 och kl.17!
              </p>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
