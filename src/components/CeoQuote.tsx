import "./CeoQuote.css";

export default function CeoQuote() {
  return (
    <section id="citation" aria-label="Mot du dirigeant" className="yg-ceo">
      <figure className="yg-ceo-figure">
        <div className="yg-ceo-row">
          <span className="yg-ceo-portrait">
            <img src="/uploads/ceo-portrait.png" alt="Pierre-Stéphane Ado, CEO de Yepado Group" className="yg-ceo-portrait-img" />
          </span>
          <div className="yg-ceo-text">
            <span aria-hidden="true" className="yg-ceo-quote-mark">
              “
            </span>
            <blockquote className="yg-ceo-quote">
              Rien ne change tant que rien ne bouge. Arrête de réfléchir… commence. Le premier pas change tout.
            </blockquote>
            <figcaption className="yg-ceo-caption">
              <span>
                <span className="yg-ceo-name">Pierre-Stéphane Ado</span> — CEO Yepado Group
              </span>
            </figcaption>
          </div>
        </div>
      </figure>
    </section>
  );
}
